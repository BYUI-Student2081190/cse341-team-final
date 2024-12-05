const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Entertainment Central Api',
        description: 'A place for entertainment needs!'
    },
    host: 'localhost:2024',
    schemes: ['http', 'https']
};

const outputfile = "./swagger.json";
const endpointfile = ['./routes/indexRoute.js'];

swaggerAutogen(outputfile, endpointfile, doc);