/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

// function wait(n) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("resolved");
//     }, n);
//   });
// }

// const response = wait(5000);
// response.then((res) => console.log(res));

function wait(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, n * 1000);
  });
}

// wait(3000).then((res) => console.log(res));

module.exports = wait;
