const getEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

export const SUPABASE_URL = getEnvVar('EXPO_PUBLIC_SUPABASE_URL');
export const SUPABASE_ANON_KEY = getEnvVar('EXPO_PUBLIC_SUPABASE_ANON_KEY');

// Storage bucket names
export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',
  RECEIPTS: 'receipts',
  NOTIFICATIONS: 'notifications',
} as const;

// Allowed file types
export const ALLOWED_FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/png', 'image/jpg'],
  DOCUMENTS: ['application/pdf'],
} as const;

// Maximum file sizes (in bytes)
export const MAX_FILE_SIZES = {
  AVATAR: 5 * 1024 * 1024, // 5MB
  RECEIPT: 10 * 1024 * 1024, // 10MB
  NOTIFICATION_IMAGE: 5 * 1024 * 1024, // 5MB
} as const;
