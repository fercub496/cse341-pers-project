const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info:{
        title:'Store items Api',
        description: 'Store items Api'
    },
    host: 'localhost:3002',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
