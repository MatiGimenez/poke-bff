/**
 * Adjusts the brightness of a hexadecimal color.
 * @param {string} hexColor - The original color in hexadecimal notation (e.g., "#RRGGBB").
 * @param {number} amount - The amount to adjust the brightness (-255 to 255).
 *                          Positive values lighten the color, negative values darken it.
 * @returns {string} The adjusted color in hexadecimal notation.
 */
export const adjustColor = (hexColor: string, amount: number): string => {
  // Remove the hash if present
  hexColor = hexColor.replace('#', '');

  // Parse the R, G, B values
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Adjust each color channel and clamp to [0, 255]
  const newR = Math.min(255, Math.max(0, r + amount));
  const newG = Math.min(255, Math.max(0, g + amount));
  const newB = Math.min(255, Math.max(0, b + amount));

  // Convert back to hex and pad with zeros if needed
  const adjustedColor =
    '#' +
    [newR, newG, newB]
      .map((value) => value.toString(16).padStart(2, '0'))
      .join('');

  return adjustedColor;
};
