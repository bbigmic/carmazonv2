import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/cars/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const car = await prisma.car.findUnique({
      where: { id }
    });

    if (!car) {
      return NextResponse.json(
        { error: 'Samochód nie został znaleziony' },
        { status: 404 }
      );
    }

    return NextResponse.json(car);
  } catch (error) {
    console.error('Błąd podczas pobierania samochodu:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas pobierania samochodu' },
      { status: 500 }
    );
  }
}

// PUT /api/cars/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    // Sprawdź limit promowanych samochodów jeśli samochód ma być promowany
    if (data.featured === true) {
      const currentCar = await prisma.car.findUnique({
        where: { id },
        select: { featured: true }
      });

      // Jeśli samochód nie był wcześniej promowany, sprawdź limit
      if (!currentCar?.featured) {
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
    }

    const car = await prisma.car.update({
      where: { id },
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
    console.error('Błąd podczas aktualizacji samochodu:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas aktualizacji samochodu' },
      { status: 500 }
    );
  }
}

// DELETE /api/cars/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.car.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Samochód został usunięty' });
  } catch (error) {
    console.error('Błąd podczas usuwania samochodu:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas usuwania samochodu' },
      { status: 500 }
    );
  }
}
