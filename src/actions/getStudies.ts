import prisma from '@/libs/prismadb';

export interface IListingsParams {
  leaderId?: string;
  category?: string;
  city?: string;
  district?: string;
  maxPeople?: number;
}

export default async function getStudies(params: IListingsParams) {
  try {
    const { leaderId, category, city, district, maxPeople } = params;

    let query: any = {};

    if (leaderId) {
      query.leaderId = leaderId;
    }

    if (category) {
      query.category = category;
    }

    if (city) {
      query.city = city;
    }

    if (district) {
      query.district = district;
    }

    if (maxPeople) {
      query.maxPeople = {
        lte: +maxPeople,
      };
    }

    const studies = await prisma.study.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return studies;
  } catch (error: any) {
    throw new Error(error);
  }
}
