const express = require('express');
const app = express();

// Serve static files from the default directory (public)
app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});