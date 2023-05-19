import Navbar from '@/components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';
import RegisterModal from '@/components/modals/RegisterModal';
import ToasterProvider from '@/providers/ToasterProvider';
import LoginModal from '@/components/modals/LoginModal';
import getCurrentUser from '../actions/getCurrentUser';
import RentModal from '@/components/modals/RentModal';
import SearchModal from '@/components/modals/SearchModal';

const fontNunito = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'space. 공간을 자유롭게',
  description: '공간 대여 플랫폼',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body className={fontNunito.className}>
        <ToasterProvider />
        <Navbar currentUser={currentUser} />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <SearchModal />
        {children}
      </body>
    </html>
  );
}
