export interface Faq {
  id: number;
  question: string;
  answer: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface FaqState {
  faq: Faq[];
  loading: boolean;
  error: string | null;
}

export interface CreateFaqPayload {
  question: string;
  answer: string;
  createdBy: number;
}

export interface UpdateFaqPayload {
  question: string;
  answer: string;
  updatedBy: number;
}
