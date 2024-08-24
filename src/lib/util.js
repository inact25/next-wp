/**
 * decodeHtmlEntities
 */

export function decodeHtmlEntities(text) {
  if (typeof text !== 'string') {
    throw new Error(`Failed to decode HTML entity: invalid type ${typeof text}`);
  }

  let decoded = text;

  const entities = {
    '&amp;': '\u0026',
    '&quot;': '\u0022',
    '&#039;': '\u0027',
  };

  return decoded.replace(/&amp;|&quot;|&#039;/g, (char) => entities[char]);
}

/**
 * removeLastTrailingSlash
 */

export function removeLastTrailingSlash(url) {
  if (typeof url !== 'string') return url;
  return url.replace(/\/$/, '');
}

export function removeExtraSpaces(text) {
  if (typeof text !== 'string') return;
  return text.replace(/\s+/g, ' ').trim();
}

export function findAndReplaceSrc(htmlString, homepage) {
  // Regular expression to find img tags with src attribute
  const regex = /(<img\s+[^>]*src=")(https?:\/\/[^/]+\/[^"]*)(")/g;

  return htmlString.replace(regex, (match, p1, p2, p3) => {
    // Automatically detect the old base URL
    const oldBaseUrl = p2.split('/').slice(0, 3).join('/') + '/wp-content/';

    // Construct the new URL by replacing the detected base URL with a new format
    const newBaseUrl = `${homepage}/api/assets?url=`;
    const replacedUrl = newBaseUrl + encodeURIComponent(p2.toString().replace(oldBaseUrl, ''));

    // Return the modified img tag
    return p1 + replacedUrl + p3;
  });
}
