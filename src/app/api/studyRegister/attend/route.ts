import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new Response('Unauthorized access detected', { status: 401 });
  }

  const { studyRegistrationId, late } = await request.json();
  const attend = await prisma.attend.create({
    data: {
      studyRegistrationId,
      state: late ? 2 : 1,
    },
  });

  return NextResponse.json(attend);
}
