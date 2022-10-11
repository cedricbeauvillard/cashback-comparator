export function getSlugFromName(name: string): string | undefined {
  const invalidCharsRegex = [
    /\.fr/g,
    /\.com/g,
    /\&/g,
    /\#/g,
    /\?/g,
    /\+/g,
    /\%/g,
    /\*/g,
    /\~/g,
    /\./g,
    /\(/g,
    /\)/g,
    /\'/g,
    /\"/g,
    /\!/g,
    /\:/g,
    /\@/g,
    /\]/g,
    /\\/g,
  ];

  let finalSlug = '';

  // 1 - Remove parenthesis content
  finalSlug = name.replace(/ *\([^)]*\) */g, '');

  // 2 - Remove invalid chars
  invalidCharsRegex.map((charRegex) => {
    finalSlug = finalSlug.replace(charRegex, '');
  });

  // 3 - Prevent double spaces and triple spaces
  finalSlug = finalSlug.replace(/\s\s+/g, ' ');
  finalSlug = finalSlug.replace(/\s\s\s+/g, ' ');

  // 4 - Prevent already dashed with spaces
  finalSlug = finalSlug.replace(/\s\-\s/g, '-');

  // 5 - Remove spaces and replace by dash
  finalSlug = finalSlug.replace(/\s/g, '-');

  // 6 - To lower case
  finalSlug = finalSlug.toLowerCase();

  return finalSlug;
}
