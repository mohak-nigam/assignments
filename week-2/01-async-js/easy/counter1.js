let counter = 0;

function incrementAndLog() {
  if (counter === 5) return;
  counter += 1;
  console.log(counter);
}

// Start the process
setInterval(incrementAndLog, 1000);
