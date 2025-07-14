import { v4 as uuidv4 } from 'uuid';

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const generateShortcode = () => {
  return uuidv4().slice(0, 6); 
};
