import getCurrentUser from '@/actions/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { studyId } = body;

  if (!studyId) {
    return NextResponse.error();
  }

  const studyRegistration = await prisma.study.update({
    where: {
      id: studyId,
    },
    data: {
      studyRegistrations: {
        create: {
          userId: currentUser.id,
        },
      },
    },
  });

  return NextResponse.json(studyRegistration);
}
