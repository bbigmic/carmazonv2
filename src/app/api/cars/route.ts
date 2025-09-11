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
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas pobierania samochodów' },
      { status: 500 }
    );
  }
}

// POST /api/cars
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
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
        brand: data.brand,
        model: data.model,
        year: parseInt(data.year),
        price: parseFloat(data.price),
        mileage: parseInt(data.mileage),
        fuelType: data.fuelType,
        transmission: data.transmission,
        engineSize: data.engineSize,
        color: data.color,
        description: data.description,
        images: data.images || [],
        isAvailable: data.isAvailable !== false,
        featured: data.featured === true
      }
    });

    return NextResponse.json(car);
  } catch (error) {
    console.error('Błąd podczas dodawania samochodu:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas dodawania samochodu' },
      { status: 500 }
    );
  }
}
