import Navbar from '@/components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';
import RegisterModal from '@/components/modals/RegisterModal';
import ToasterProvider from '@/providers/ToasterProvider';
import LoginModal from '@/components/modals/LoginModal';
import getCurrentUser from '../actions/getCurrentUser';
import SearchModal from '@/components/modals/SearchModal';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import OpenStudyModal from '@/components/modals/OpenStudyModal';
import Script from 'next/script';

const fontNunito = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'studywith. 같이 성장해요',
  description: '스터디 구인 플랫폼',
};

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false&libraries=services`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body className={fontNunito.className}>
        <Script src={KAKAO_SDK_URL} strategy='beforeInteractive' />
        <ToasterProvider />
        <Navbar currentUser={currentUser} />
        <RegisterModal />
        <LoginModal />
        <SearchModal />
        <OpenStudyModal />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
