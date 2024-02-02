/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  const saturatedString = str.replace(/[^a-z0-9]/gi, "").toLowerCase();

  // OR this

  // const saturatedString = str.toLowerCase().replace(/[^a-z0-9]/g, "");

  /*
  Certainly! The regular expression /[^a-z0-9]/gi is used for pattern matching and replacement in strings. Let's break down the components:

/: Delimiters indicating the start and end of the regular expression.
[^a-z0-9]: A character class that matches any character that is not (^ inside the character class negates the class) a lowercase letter (a to z) or a digit (0 to 9).
/: Delimiters indicating the end of the regular expression.
gi: Flags indicating the behavior of the regular expression:
g: Global flag - Match all occurrences, not just the first one.
i: Case-insensitive flag - Perform a case-insensitive match.
So, /[^a-z0-9]/gi can be read as "match any character that is not a lowercase letter or a digit, and do this globally and case-insensitively."
  */
  let i = 0;
  let j = saturatedString.length - 1;

  while (i < j) {
    if (saturatedString[i] !== saturatedString[j]) return false;
    i++;
    j--;
  }
  return true;
}

module.exports = isPalindrome;
