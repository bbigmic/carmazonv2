import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/cars/featured-count
export async function GET() {
  try {
    const count = await prisma.car.count({
      where: {
        featured: true
      }
    });

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Błąd podczas liczenia promowanych samochodów:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas liczenia promowanych samochodów' },
      { status: 500 }
    );
  }
}
