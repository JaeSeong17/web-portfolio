import getCurrentUser from '@/actions/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';

export async function GET(request: NextRequest) {
  try {
    const queryParams = request.nextUrl.searchParams;

    const studiesCount = queryParams.get('studiesCount');
    const id = queryParams.get('id');
    const userId = queryParams.get('userId');
    const category = queryParams.get('category');
    const city = queryParams.get('city');
    const district = queryParams.get('district');
    const maxPeople = queryParams.get('maxPeople');

    let query: any = {};

    if (userId) {
      query.userId = userId;
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

    query.endDate = {
      gte: new Date(),
    };

    const pageCondition = {
      skip: 1,
      cursor: {
        id: id as string,
      },
    };

    const studies = await prisma.study.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
      take: studiesCount ? parseInt(studiesCount, 10) : 12,
      ...(!!id && pageCondition),
    });

    const safeStudies = studies.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return NextResponse.json(safeStudies);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    subtitle,
    description,
    category,
    maxPeople,
    meetingCount,
    meetingDay,
    type,
    latePenalty,
    absentPenalty,
    city,
    district,
    imageSrc,
    dateRange,
  } = body;

  const study = await prisma.study.create({
    data: {
      title,
      subtitle,
      description,
      category,
      maxPeople,
      meetingCount,
      meetingDay,
      type,
      latePenalty: parseInt(latePenalty, 10),
      absentPenalty: parseInt(absentPenalty, 10),
      city: city.value,
      district: district.value,
      imageSrc,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      leaderId: currentUser.id,

      studyRegistrations: {
        create: [{ userId: currentUser.id, accepted: true }],
      },
    },
    include: {
      studyRegistrations: true,
    },
  });

  return NextResponse.json(study);
}
