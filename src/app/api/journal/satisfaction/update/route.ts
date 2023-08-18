import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return new Response('Unauthorized access detected', { status: 401 });
  }

  const { feedbackId, satisfaction } = await request.json();

  if (!feedbackId) {
    throw new Error('params error');
  }

  const feedback = await prisma.feedback.update({
    where: {
      id: feedbackId,
    },
    data: {
      satisfaction,
    },
  });

  return NextResponse.json(feedback);
}
