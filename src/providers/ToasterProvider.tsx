'use client';

import { Toaster } from 'react-hot-toast';

import { FC } from 'react';

interface ToasterProviderProps {}

const ToasterProvider: FC<ToasterProviderProps> = ({}) => {
  return <Toaster />;
};

export default ToasterProvider;
