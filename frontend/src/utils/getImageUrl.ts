// src/utils/getImageUrl.ts

export const getImageUrl = (imageSrc: any): string => {
  const FALLBACK_IMAGE = '/images/placeholder.jpg';

  if (!imageSrc) return FALLBACK_IMAGE;

  let target: any = imageSrc;

  if (Array.isArray(target)) {
    if (target.length === 0) return FALLBACK_IMAGE;
    target = target[0];
  }

  if (typeof target === 'object' && target !== null) {
    target = target.secure_url || target.url || target.path || target.src || '';
  }

  if (typeof target !== 'string' || !target.trim()) {
    return FALLBACK_IMAGE;
  }

  target = target.trim();

  if (target.startsWith('http://') || target.startsWith('https://')) {
    return target;
  }

  if (target.startsWith('//')) {
    return `https:${target}`;
  }

  if (target.startsWith('/assets/') || target.startsWith('/images/')) {
    return target;
  }

  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  const cleanPath = target.startsWith('/') ? target : `/${target}`;

  return `${backendBaseUrl}${cleanPath}`;
};