const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(` BunaSIEM backend running on http://localhost:${PORT}`);
  console.log(`API Health: http://localhost:${PORT}/api/health`);
  console.log(`Frontend: http://localhost:5173/`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
