import { NextRequest, NextResponse } from 'next/server';

const RATE_LIMIT_MAP = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 requests per minute per IP

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
  return ip;
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = RATE_LIMIT_MAP.get(ip);

  if (!record || now > record.resetTime) {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input
    .trim()
    .slice(0, 1000)
    .replace(/[<>]/g, '');
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, organization, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate and sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedOrganization = sanitizeInput(organization || '');
    const sanitizedMessage = sanitizeInput(message);

    if (!sanitizedName || sanitizedName.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (!validateEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (!sanitizedMessage || sanitizedMessage.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // TODO: Send email via configured email service
    // For now, log the submission (in production, integrate with email provider)
    const contactData = {
      name: sanitizedName,
      email: sanitizedEmail,
      organization: sanitizedOrganization,
      message: sanitizedMessage,
      submittedAt: new Date().toISOString(),
      ip: ip.slice(0, 8), // Log partial IP for debugging
    };

    console.log('[Contact Form Submission]', {
      ...contactData,
      ip: 'redacted',
    });

    // TODO: Send to email service (SendGrid, Resend, etc.)
    // Example with Resend:
    // const { error } = await resend.emails.send({
    //   from: process.env.CONTACT_EMAIL_FROM || 'noreply@lcg.local',
    //   to: process.env.CONTACT_EMAIL_TO || 'contact@lcg.local',
    //   subject: `New contact form submission from ${sanitizedName}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${sanitizedName}</p>
    //     <p><strong>Email:</strong> ${sanitizedEmail}</p>
    //     ${sanitizedOrganization ? `<p><strong>Organization:</strong> ${sanitizedOrganization}</p>` : ''}
    //     <p><strong>Message:</strong></p>
    //     <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
    //   `,
    // });
    // if (error) return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });

    return NextResponse.json(
      { message: 'Message received. We will get back to you soon.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact Form Error]', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
