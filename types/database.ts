export type Profile = {
  id: string;
  created_at: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: 'student' | 'driver';
  phone_number: string | null;
  student_id: string | null;
};

export type Notification = {
  id: string;
  created_at: string;
  title: string;
  message: string;
  sender_id: string;
  image_url: string | null;
};

export type Payment = {
  id: string;
  created_at: string;
  amount: number;
  student_id: string;
  payment_date: string;
  receipt_url: string;
  status: 'pending' | 'approved' | 'rejected';
};

export type Receipt = {
  id: string;
  created_at: string;
  user_id: string;
  transaction_id: string;
  date: string;
  bank: string;
  image_url: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      notifications: {
        Row: Notification;
        Insert: Omit<Notification, 'id' | 'created_at'>;
        Update: Partial<Omit<Notification, 'id' | 'created_at'>>;
      };
      payments: {
        Row: Payment;
        Insert: Omit<Payment, 'id' | 'created_at'>;
        Update: Partial<Omit<Payment, 'id' | 'created_at'>>;
      };
      receipts: {
        Row: Receipt;
        Insert: Omit<Receipt, 'id' | 'created_at'>;
        Update: Partial<Omit<Receipt, 'id' | 'created_at'>>;
      };
    };
  };
};
