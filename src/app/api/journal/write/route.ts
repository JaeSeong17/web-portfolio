import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const currentUser = getCurrentUser;
  if (!currentUser) {
    return new Response('Unauthorized access detected', {
      status: 401,
    });
  }

  const { studyId, date, title, content } = await request.json();

  if (!studyId || !date) {
    throw new Error('params error');
  }

  const journal = await prisma.journal.create({
    data: {
      studyId,
      date,
      title,
      content,
    },
  });

  const study = await prisma.study.findUnique({
    where: {
      id: studyId,
    },
    include: {
      studyRegistrations: true,
    },
  });

  const memberIds = study?.studyRegistrations.map((reg) => reg.userId);

  const feedbacks = memberIds?.map(async (memberId) => {
    await prisma.feedback.create({
      data: {
        journalId: journal.id,
        userId: memberId,
      },
    });
  });

  const journalWithFeedbacks = await prisma.journal.findUnique({
    where: {
      id: journal.id,
    },
    include: {
      feedbacks: true,
    },
  });

  return NextResponse.json(journalWithFeedbacks);
}
