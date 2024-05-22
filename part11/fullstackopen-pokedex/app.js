const express = require('express');
const app = express();

// get the port from env variable
const PORT = process.env.PORT || 5000;

app.use(express.static('dist'));

app.get('/health', (req, res) => {
  res.send('ok');
});

// pull request from branch to main

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`server started on port ${PORT}`);
});
