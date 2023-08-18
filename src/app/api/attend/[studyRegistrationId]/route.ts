import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
  studyRegistrationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new Response('Unauthorized access detected', {
      status: 401,
    });
  }

  const { studyRegistrationId } = params;
  const { late } = await request.json();

  if (!studyRegistrationId) {
    throw new Error('studyRegistrationId parameter error');
  }

  const studyRegistration = await prisma.attend.create({
    data: {
      studyRegistrationId,
      state: late ? 2 : 1,
    },
  });

  return NextResponse.json(studyRegistration);
}
