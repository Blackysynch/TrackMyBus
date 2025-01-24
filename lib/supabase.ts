import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';
import { SUPABASE_URL, SUPABASE_ANON_KEY, STORAGE_BUCKETS, ALLOWED_FILE_TYPES, MAX_FILE_SIZES } from '../config/env';

// Initialize Supabase client - Replace with your values from .env
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Profile management
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateProfile = async (userId: string, updates: any) => {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  
  if (error) throw error;
};

// Notifications
export const getNotifications = async (userId: string, isDriver: boolean) => {
  let query = supabase
    .from('notifications')
    .select(`
      *,
      profiles:sender_id (
        full_name,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false });

  if (!isDriver) {
    // Students see all notifications
    return await query;
  } else {
    // Drivers see only their notifications
    return await query.eq('sender_id', userId);
  }
};

export const createNotification = async (notification: any) => {
  const { error } = await supabase
    .from('notifications')
    .insert(notification);
  
  if (error) throw error;
};

// Payments
export const getPayments = async (userId: string, isDriver: boolean) => {
  let query = supabase
    .from('payments')
    .select(`
      *,
      profiles:student_id (
        full_name,
        student_id
      )
    `)
    .order('created_at', { ascending: false });

  if (!isDriver) {
    // Students see only their payments
    return await query.eq('student_id', userId);
  } else {
    // Drivers see all payments
    return await query;
  }
};

export const updatePaymentStatus = async (paymentId: string, status: 'approved' | 'rejected') => {
  const { error } = await supabase
    .from('payments')
    .update({ status })
    .eq('id', paymentId);
  
  if (error) throw error;
};

// Receipts
export const getReceipts = async (userId: string, isDriver: boolean) => {
  let query = supabase
    .from('receipts')
    .select(`
      *,
      profiles:user_id (
        full_name,
        student_id
      )
    `)
    .order('created_at', { ascending: false });

  if (!isDriver) {
    // Students see only their receipts
    return await query.eq('user_id', userId);
  } else {
    // Drivers see all receipts
    return await query;
  }
};

// Storage
export const uploadFile = async (bucket: string, path: string, file: any) => {
  // Validate file type and size
  const isValidFileType = (fileType: string, allowedTypes: string[]) => {
    return allowedTypes.includes(fileType);
  };

  const validateFileSize = (size: number, maxSize: number) => {
    return size <= maxSize;
  };

  // Get file type and size from the file object
  const fileType = file.type;
  const fileSize = file.size;

  // Determine allowed types and max size based on bucket
  let allowedTypes: string[] = [];
  let maxSize: number = 0;

  switch (bucket) {
    case STORAGE_BUCKETS.AVATARS:
      allowedTypes = ALLOWED_FILE_TYPES.IMAGES;
      maxSize = MAX_FILE_SIZES.AVATAR;
      break;
    case STORAGE_BUCKETS.RECEIPTS:
      allowedTypes = [...ALLOWED_FILE_TYPES.IMAGES, ...ALLOWED_FILE_TYPES.DOCUMENTS];
      maxSize = MAX_FILE_SIZES.RECEIPT;
      break;
    case STORAGE_BUCKETS.NOTIFICATIONS:
      allowedTypes = ALLOWED_FILE_TYPES.IMAGES;
      maxSize = MAX_FILE_SIZES.NOTIFICATION_IMAGE;
      break;
    default:
      throw new Error('Invalid storage bucket');
  }

  // Validate file
  if (!isValidFileType(fileType, allowedTypes)) {
    throw new Error('Invalid file type');
  }

  if (!validateFileSize(fileSize, maxSize)) {
    throw new Error('File size exceeds limit');
  }

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file);
  
  if (error) throw error;
};

export const getFileUrl = (bucket: string, path: string) => {
  return supabase.storage
    .from(bucket)
    .getPublicUrl(path).data.publicUrl;
};
