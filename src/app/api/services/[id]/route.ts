import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// DELETE /api/services/[id]
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  try {
    await prisma.service.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ message: 'Usługa została usunięta' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas usuwania usługi' },
      { status: 500 }
    );
  }
}
