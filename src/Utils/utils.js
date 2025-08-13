const Utils = {
  /**
   * Generates a random string of Arabic characters.
   *
   * @param {number} num - The length of the desired Arabic string.
   * @returns {string} - A randomly generated string of Arabic characters.
   */
  generateRandomArabicString: function (num) {
    const asciirange1 = 0x0621; // Unicode for 'ء'
    const asciirange2 = 0x063a; // Unicode for 'غ'
    let result = "";
    for (let i = 0; i < num; i++) {
      const randomChar = String.fromCharCode(
        Math.floor(Math.random() * (asciirange2 - asciirange1 + 1)) +
        asciirange1
      );
      result += randomChar;
    }
    return result;
  },

  /**
   * Generates a random string of English letters.
   *
   * @param {number} num - The length of the desired English string.
   * @returns {string} - A randomly generated string of English letters.
   */
  generateRandomEnglishString: function (num) {
    const asciirange1 = 65; // ASCII for 'A'
    const asciirange2 = 122; // ASCII for 'z'
    let result = "";
    for (let i = 0; i < num; i++) {
      let randomChar;
      do {
        randomChar = String.fromCharCode(
          Math.floor(Math.random() * (asciirange2 - asciirange1 + 1)) +
          asciirange1
        );
      } while (!/[a-zA-Z]/.test(randomChar)); // Ensure the character is a valid letter
      result += randomChar;
    }
    return result;
  },

  /**
   * Generates a random numeric string of the specified length.
   *
   * @param {number} length - The desired length of the numeric string.
   * @returns {string} - A randomly generated numeric string.
   */
  generateRandomNumber: function (length) {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join(
      ""
    );
  },

  /**
     *  Gets the current date in YYYY-MM-DD format.
     *
     * @returns {string} - The current date as a formatted string.
     */
  getCurrentDate: function () {
    return new Date().toISOString().split('T')[0];
  },

  /**
   * Gets the date after a specified number of days from today.
   *
   * @param {number} days - The number of days to add.
   * @returns {string} - The calculated future date in YYYY-MM-DD format.
   */
  getDateAfterDays: function (days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  },

  getFormattedDate(format = 'MM/dd/yyyy', dateObj = new Date()) {
  var yyyy = dateObj.getFullYear();
  var MM = String(dateObj.getMonth() + 1).padStart(2, '0');
  var dd = String(dateObj.getDate()).padStart(2, '0');
  var HH = String(dateObj.getHours()).padStart(2, '0');
  var mm = String(dateObj.getMinutes()).padStart(2, '0');
  var ss = String(dateObj.getSeconds()).padStart(2, '0');
  return format
    .replace('yyyy', yyyy)
    .replace('MM', MM)
    .replace('dd', dd)
    .replace('HH', HH)
    .replace('mm', mm)
    .replace('ss', ss);
}

};

module.exports = { Utils };
