import prisma from '@/libs/prismadb';

export interface IJournalsParams {
  studyId: string;
}

export default async function getJournalsByStudyId(params: IJournalsParams) {
  try {
    const journals = await prisma.journal.findMany({
      where: {
        studyId: params.studyId,
      },
      orderBy: {
        date: 'asc',
      },
      include: {
        feedbacks: true,
      },
    });

    return journals;
  } catch (error: any) {
    throw new Error(error);
  }
}
