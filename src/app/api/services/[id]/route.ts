import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PUT /api/services/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();

    const service = await prisma.service.update({
      where: { id },
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
    console.error('Błąd podczas aktualizacji usługi:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas aktualizacji usługi' },
      { status: 500 }
    );
  }
}

// DELETE /api/services/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.service.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Usługa została usunięta' });
  } catch (error) {
    console.error('Błąd podczas usuwania usługi:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas usuwania usługi' },
      { status: 500 }
    );
  }
}
