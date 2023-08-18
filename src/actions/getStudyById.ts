import prisma from '@/libs/prismadb';

interface IParams {
  studyId?: string;
}

export default async function getStudyById(params: IParams) {
  try {
    const { studyId } = params;

    const study = await prisma.study.findUnique({
      where: {
        id: studyId,
      },
      include: {
        leader: true,
      },
    });

    if (!study) {
      return null;
    }

    return {
      ...study,
      createdAt: study.createdAt.toISOString(),

      leader: {
        ...study.leader,
        createdAt: study.leader.createdAt.toISOString(),
        updatedAt: study.leader.updatedAt.toISOString(),
        emailVerified: study.leader.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
