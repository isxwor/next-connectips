import { customAlphabet } from 'nanoid';

export const generateUniqueId = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  18
);
