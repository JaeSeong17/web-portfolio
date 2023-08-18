import {
  Attend,
  Feedback,
  Journal,
  Study,
  StudyRegistration,
  User,
} from '@prisma/client';

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeStudy = Omit<Study, 'createdAt'> & {
  createdAt: string;
};

export type StudyRegistrationWithoutStudy = StudyRegistration & {
  user: User;
  attends: Attend[];
};

export type StudyRegistrationWithStudy = StudyRegistration & {
  user: User;
  study: Study;
  attends: Attend[];
};

export type JournalWithFeedbacks = Journal & {
  feedbacks: Feedback[];
};
