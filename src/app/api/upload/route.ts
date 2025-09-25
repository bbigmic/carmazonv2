import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Nie znaleziono pliku' },
        { status: 400 }
      );
    }

    // Konwertuj File na Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload do Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'carmazon/cars',
          transformation: [
            { width: 800, height: 600, crop: 'fill', quality: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({ 
      url: (result as any).secure_url,
      publicId: (result as any).public_id 
    });
  } catch (error) {
    console.error('Błąd podczas uploadu:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas uploadu pliku' },
      { status: 500 }
    );
  }
}


