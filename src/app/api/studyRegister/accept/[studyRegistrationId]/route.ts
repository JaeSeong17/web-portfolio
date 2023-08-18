import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
  studyRegistrationId?: string;
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
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

  const updateStudyRegistraton = await prisma.studyRegistration.update({
    where: {
      id: studyRegistrationId,
    },
    data: {
      accepted: true,
    },
  });

  if (!updateStudyRegistraton) {
    return new Response('Fail to update registration accepted', {
      status: 500,
    });
  }

  return NextResponse.json(updateStudyRegistraton);
}
