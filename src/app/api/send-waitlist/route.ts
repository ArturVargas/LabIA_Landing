// app/api/send-waitlist/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import WaitlistWelcome from '@/components/emails/WaitlistWelcome'; // Adjust path

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, firstName } = await req.json(); // Parse form data

    // Optional: Save to your database (e.g., Prisma, Supabase) for waitlist management
    // await db.waitlist.create({ data: { email, firstName } });

    const { data, error } = await resend.emails.send({
      from: 'Your App <waitlist@yourdomain.com>', // Use your verified domain
      to: [email],
      subject: 'You’re on the Waitlist – Get Ready to Spark Chemistry!',
      react: WaitlistWelcome({ name: firstName, email, language: 'en' }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}