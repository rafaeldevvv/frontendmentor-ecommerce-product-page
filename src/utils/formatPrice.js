/**
 * Turns a number into a formatted price string.
 * 
 * @param {number} price 
 * @returns {string} A string representing the formatted price.
 * 
 * @example
 * formatPrice(200)
 * // => "$200.00"
 */
export default function formatPrice(price) {
   if (Number.isInteger(price)) {
      return "$" + price.toLocaleString("en") + ".00";
   } else {
      const priceStr = price.toString(),
         decimalIndex = priceStr.indexOf("."),
         decimal = priceStr.slice(decimalIndex, decimalIndex + 3);
      return (
         "$" + Math.floor(price).toLocaleString("en") + decimal.padEnd(3, "0")
      );
   }
}