const express= require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors')
const routes = require('./routes/routes.js');

dotenv.config();
const app = express();
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    console.log('Development Mode ');
    routes(app);
  } else {
    routes(app);
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(`${__dirname}/client/build/index.html`));
    });
  }
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`El servidor arranco en el puerto ${PORT}`));
