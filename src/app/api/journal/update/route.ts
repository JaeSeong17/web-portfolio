import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  const currentUser = getCurrentUser;
  if (!currentUser) {
    return new Response('Unauthorized access detected', {
      status: 401,
    });
  }

  const { journalId, title, content } = await request.json();

  if (!journalId) {
    throw new Error('params error');
  }

  const journal = await prisma.journal.update({
    where: {
      id: journalId,
    },
    data: {
      title,
      content,
    },
  });

  return NextResponse.json(journal);
}
