import prisma from '@/libs/prismadb';

interface IParams {
  studyRegistrationId?: string;
  studyId?: string;
  leaderId?: string;
  currentUserId?: string;
  includeStudy?: boolean;
}

export default async function getStudyRegistrations(params: IParams) {
  try {
    const {
      studyRegistrationId,
      studyId,
      leaderId,
      currentUserId,
      includeStudy = false,
    } = params;
    const query: any = {};

    if (studyRegistrationId) {
      query.studyRegistrationId = studyRegistrationId;
    }
    if (studyId) {
      query.studyId = studyId;
    }
    if (leaderId) {
      query.leaderId = leaderId;
    }
    if (currentUserId) {
      query.userId = currentUserId;
    }

    const studyRegistrations = await prisma.studyRegistration.findMany({
      where: query,
      include: {
        user: true,
        study: includeStudy,
        attends: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return studyRegistrations;
  } catch (error: any) {
    throw new Error(error);
  }
}
