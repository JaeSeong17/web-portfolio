import getCurrentUser from '@/actions/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

interface IParams {
  studyId?: string;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { studyId } = params;

  if (!studyId || typeof studyId !== 'string') {
    throw new Error('Invalid ID :' + studyId);
  }

  const registrations = await prisma.study.deleteMany({
    where: {
      id: studyId,
      OR: [{ leaderId: currentUser.id }],
    },
  });

  return NextResponse.json(registrations);
}
