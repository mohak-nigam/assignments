let counter = 0;

function incrementAndLog() {
  counter += 1;
  console.log(counter);

  if (counter < 10) {
    setTimeout(incrementAndLog, 1000);
  }
}

// Start the process
incrementAndLog();
