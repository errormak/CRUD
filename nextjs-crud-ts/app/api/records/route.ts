import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const records = await prisma.record.findMany();
  return NextResponse.json(records);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  const newRecord = await prisma.record.create({
    data: { name, email, password },
  });

  return NextResponse.json(newRecord);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, name, email, password } = body;

  const updatedRecord = await prisma.record.update({
    where: { id },
    data: { name, email, password },
  });

  return NextResponse.json(updatedRecord);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get('id') || '');

  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

  await prisma.record.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Record deleted successfully' });
}