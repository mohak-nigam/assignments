/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
  return new Promise((resolve, reject) => {
    const startTime = new Date().getTime();
    let currentTime = startTime;

    // Busy wait until the specified time has passed
    while (currentTime - startTime < milliseconds) {
      currentTime = new Date().getTime();
    }

    resolve();
  });
}

// Example usage
// sleep(5000).then((result) => console.log(result));
// console.log(2);

module.exports = sleep;
