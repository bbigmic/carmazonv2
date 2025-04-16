import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(data.date),
        time: data.time,
        clientName: data.name,
        clientEmail: data.email,
        clientPhone: data.phone,
        serviceId: data.service,
        notes: data.message,
        status: 'pending',
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error('Błąd podczas zapisywania wizyty:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas zapisywania wizyty' },
      { status: 500 }
    );
  }
} 