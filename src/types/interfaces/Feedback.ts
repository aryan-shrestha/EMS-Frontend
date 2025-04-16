export interface FeedbackCategory {
  id: number;
  title: string;
  slug: string;
  date: string;
  created_at: string;
  updated_at: string;
  organization: number;
}

export interface FeedbackAttachment {
  id: number;
  feedback: number;
  file: string;
  uploaded_at: string;
}

export interface Feedback {
  id: number;
  organization: number;
  title: string;
  description: string;
  category: FeedbackCategory;
  status: "new" | "in_progress" | "resolved";
  is_anonymous: boolean;
  date: string;
  created_at: string;
  updated_at: string;
  attachments: FeedbackAttachment[];
}
