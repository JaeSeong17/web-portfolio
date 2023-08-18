import bcrypt from 'bcrypt';

import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  // 입력한 비밀번호를 해시 변환
  const hashedPassword = await bcrypt.hash(password, 12);

  // 이메일 중복 확인
  const prevUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (prevUser) {
    return new Response('Exists email', { status: 409 });
  }

  // 사용자 정보를 DB에 등록
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  // json을 받아 객체로 변환 후 반환
  return NextResponse.json(user);
}
