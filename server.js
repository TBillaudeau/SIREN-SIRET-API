const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const siretRoutes = require('./routes/siretRoutes');

const app = express();
const port = 3000;

const options = {
    definition: {
      info: {
        title: 'SIRET API',
        version: '1.0.0',
        description: 'API - Base of companies and their establishments (SIREN, SIRET)',
      },
    },
    apis: ['./routes/*.js'],
  };

app.use(express.json());
app.use('/siret', siretRoutes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});