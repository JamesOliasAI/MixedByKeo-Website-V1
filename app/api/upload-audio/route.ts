import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('audioFile') as File | null
    const serviceType = formData.get('serviceType') as string
    const projectName = formData.get('projectName') as string
    const artistName = formData.get('artistName') as string
    const email = formData.get('email') as string
    const notes = formData.get('notes') as string

    if (!file) {
      return new NextResponse('No file uploaded.', { status: 400 })
    }

    const fileName = `${Date.now()}-${file.name}`;
    const bucketName = 'audio-uploads'; // Define your Supabase storage bucket name

    const { data, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(`${serviceType}/${projectName}/${artistName}/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Error uploading file to Supabase:', uploadError);
      return new NextResponse(`Error uploading file to Supabase: ${uploadError.message}`, { status: 500 });
    }

    const filePath = data?.path; // Supabase returns the path in the bucket

    // In a real application, you would save order details (including file path) to a database
    console.log('File uploaded to Supabase:', filePath);
    console.log('Order details:', { serviceType, projectName, artistName, email, notes });

    return NextResponse.json({ message: 'File uploaded successfully!', filePath: filePath });
  } catch (error: any) {
    console.error('Error in file upload process:', error);
    return new NextResponse(`Error uploading file: ${error.message}`, { status: 500 });
  }
}
