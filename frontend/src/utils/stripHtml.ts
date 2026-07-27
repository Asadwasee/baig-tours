// src/utils/stripHtml.ts

export const stripHtml = (htmlString: string): string => {
  if (!htmlString) return "";
  return htmlString.replace(/<[^>]*>?/gm, "").trim();
};