/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

const isVowel = (char) => {
  return "aeiou".includes(char);
};

function countVowels(str) {
  // Your code here
  const array = str.replace(/\s/g, "").toLowerCase().split("");
  let ans = 0;
  array.forEach((char) => {
    if (isVowel(char)) ans++;
  });
  return ans;
}

module.exports = countVowels;
