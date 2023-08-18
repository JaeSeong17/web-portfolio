import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
  studyId: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const { studyId } = params;

  if (!currentUser) {
    return new Response('Unauthorized access detected', {
      status: 401,
    });
  }

  if (!studyId) {
    throw new Error('params error');
  }

  const journals = await prisma.journal.findMany({
    where: {
      studyId: studyId,
    },
    include: {
      feedbacks: true,
    },
    orderBy: {
      date: 'asc',
    },
  });

  return NextResponse.json(journals);
}
