/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser'); // deprecated - https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes');

const app = express();

// Extended: https://swagger.io/specification/#info-object
// Define configuration object
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Clothes store API',
      description: 'Web shop management and purchases',
      contact: {
        keaID: 'mada0193, malg0102, said0390'
      },
      servers: ['http://localhost:8080']
    }
  },
  //'./server/routes/*.js'
  apis: ['app.js', './routes/*.js']
}

// Define swaggerDocs, pass in configuration
const swaggerDocs = swaggerJsDoc(swaggerOptions);
// Create endpoint with documentation, and serve generated documentation with SwaggerUi module
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// https://nodejs.org/api/esm.html#esm_enabling - rename index.js to index.js


app.use(express.urlencoded({
  extended: false,
}));
app.use(express.json());
app.use(cors());

// Routes
/**
 * @swagger
 * /:
 *   get:
 *     description: Use to request index page
 *     responses:
 *       '200':
 *         description: A successful response, API is running
 *       '500':
 *         description: Internal server error
 */
app.get('/', (req, res) => {
  res.status(200).send('Our API is running...')
      .catch( () => {
        res.status(500).json('Internal server error');
      })
});

app.use('/api', routes);

app.listen(process.env.PORT, () => console.log(`API server listening on http://localhost:${process.env.PORT}`));
