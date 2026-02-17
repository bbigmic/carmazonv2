import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/cars
export async function GET() {
  try {
    const cars = await prisma.car.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(cars);
  } catch (error) {
    console.error('Błąd podczas pobierania samochodów:', error);
    // Return empty array instead of error to prevent page crashes
    return NextResponse.json([]);
  }
}

// POST /api/cars
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Walidacja wymaganych pól
    const year = typeof data.year === 'number' ? data.year : parseInt(String(data.year), 10);
    const price = typeof data.price === 'number' ? data.price : parseFloat(String(data.price));
    const mileage = typeof data.mileage === 'number' ? data.mileage : parseInt(String(data.mileage), 10);

    if (!data.brand?.trim()) {
      return NextResponse.json({ error: 'Marka jest wymagana' }, { status: 400 });
    }
    if (!data.model?.trim()) {
      return NextResponse.json({ error: 'Model jest wymagany' }, { status: 400 });
    }
    if (Number.isNaN(year) || year < 1900 || year > new Date().getFullYear() + 1) {
      return NextResponse.json({ error: 'Podaj prawidłowy rok produkcji' }, { status: 400 });
    }
    if (Number.isNaN(price) || price < 0) {
      return NextResponse.json({ error: 'Podaj prawidłową cenę' }, { status: 400 });
    }
    if (Number.isNaN(mileage) || mileage < 0) {
      return NextResponse.json({ error: 'Podaj prawidłowy przebieg' }, { status: 400 });
    }
    
    // Sprawdź limit promowanych samochodów
    if (data.featured === true) {
      const featuredCount = await prisma.car.count({
        where: { featured: true }
      });
      
      if (featuredCount >= 3) {
        return NextResponse.json(
          { error: 'Maksymalnie 3 samochody mogą być promowane na stronie głównej' },
          { status: 400 }
        );
      }
    }
    
    const car = await prisma.car.create({
      data: {
        brand: String(data.brand).trim(),
        model: String(data.model).trim(),
        year,
        price,
        mileage,
        fuelType: data.fuelType ?? 'benzyna',
        transmission: data.transmission ?? 'manualna',
        engineSize: data.engineSize != null ? String(data.engineSize) : '',
        color: data.color ?? '',
        description: data.description != null ? String(data.description) : '',
        images: Array.isArray(data.images) ? data.images : [],
        isAvailable: data.isAvailable !== false,
        featured: data.featured === true
      }
    });

    return NextResponse.json(car);
  } catch (error) {
    console.error('Błąd podczas dodawania samochodu:', error);
    const message = error instanceof Error ? error.message : 'Wystąpił błąd podczas dodawania samochodu';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
