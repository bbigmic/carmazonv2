import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/services
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        price: true,
        duration: true,
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Błąd podczas pobierania usług:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas pobierania usług' },
      { status: 500 }
    );
  }
}

// POST /api/services
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const service = await prisma.service.create({
      data: {
        name: data.name,
        category: data.category,
        price: data.price,
        duration: data.duration,
        description: data.description
      }
    });
    return NextResponse.json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas dodawania usługi' },
      { status: 500 }
    );
  }
} 