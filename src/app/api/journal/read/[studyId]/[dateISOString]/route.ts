import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
  studyId: string;
  dateISOString: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { studyId, dateISOString } = params;

  if (!studyId || !dateISOString) {
    return new Response('Wrong params for journal', { status: 404 });
  }
  const date = new Date(dateISOString);

  const journal = await prisma.journal.findFirst({
    where: {
      studyId,
      date,
    },
    include: {
      feedbacks: true,
    },
  });

  return NextResponse.json(journal);
}
