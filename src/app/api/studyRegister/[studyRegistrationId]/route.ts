import getCurrentUser from '@/actions/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

interface IParams {
  studyRegistrationId?: string;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new Response('Unauthorized access detected', {
      status: 401,
    });
  }

  const { studyRegistrationId } = params;

  if (!studyRegistrationId || typeof studyRegistrationId !== 'string') {
    throw new Error('Invalid ID :' + studyRegistrationId);
  }

  const registrations = await prisma.studyRegistration.deleteMany({
    where: {
      id: studyRegistrationId,
      OR: [{ userId: currentUser.id }, { study: { leaderId: currentUser.id } }],
    },
  });

  return NextResponse.json(registrations);
}
