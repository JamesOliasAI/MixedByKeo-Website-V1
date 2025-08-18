import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email, serviceType, projectName, artistName } = await req.json();

    // Configure your email transporter
    // You'll need to set these environment variables in your .env.local file
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
      secure: process.env.EMAIL_SERVER_SECURE === 'true', // Use 'true' for 465, 'false' for 587
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const contractContent = `
      Dear ${artistName},

      Thank you for your recent purchase of the ${serviceType} service for your project "${projectName}" from MixedByKeo.

      This contract outlines the terms and conditions of the service you have purchased.

      Service Details:
      - Service Type: ${serviceType}
      - Project Name: ${projectName}
      - Artist Name: ${artistName}

      What the service covers:
      ${serviceType === 'mixing' ? `
      Mixing Service:
      - Professional audio mixing of your provided stems to achieve a balanced, clear, and impactful sound.
      - Includes vocal tuning (if necessary and provided with dry vocals).
      - Up to 2 revisions to ensure your satisfaction.
      - Delivery of a high-quality stereo WAV file and an MP3 file.
      ` : serviceType === 'mastering' ? `
      Mastering Service:
      - Professional audio mastering of your final mix to optimize loudness, clarity, and stereo imaging for commercial release.
      - Ensures your track translates well across all playback systems.
      - Up to 1 revision.
      - Delivery of a high-quality stereo WAV file and an MP3 file.
      ` : `
      Mix & Master Package:
      - Comprehensive professional audio mixing and mastering services.
      - Includes all benefits of the Mixing Service (vocal tuning, 2 revisions).
      - Includes all benefits of the Mastering Service (loudness optimization, clarity, stereo imaging, 1 revision).
      - Seamless transition from mix to master for optimal results.
      - Delivery of high-quality stereo WAV and MP3 files for both the mix and the master.
      `}

      Specifics:
      - All stems for mixing must be provided as individual WAV files, clearly labeled, and consolidated from the start of the session.
      - For mastering, please provide a high-quality WAV or AIFF file of your final mix, with no limiting or compression on the master bus.
      - Revisions must be requested within 7 days of initial delivery.
      - Turnaround time is typically 3-5 business days for mixing and 1-2 business days for mastering, subject to current workload.

      By proceeding with the service, you agree to these terms.

      We look forward to working on your project!

      Sincerely,
      The MixedByKeo Team
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM, // Your verified sender email
      to: email,
      subject: `MixedByKeo: Contract for Your ${serviceType} Service - Project: ${projectName}`,
      html: `<pre>${contractContent}</pre>`, // Using <pre> to preserve formatting
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Contract email sent successfully!' });
  } catch (error: any) {
    console.error('Error sending contract email:', error);
    return new NextResponse(`Error: ${error.message}`, { status: 500 });
  }
}
