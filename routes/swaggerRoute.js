/** Required Varibles **/
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger.json');
const productionSwaggerDoc = require('../swagger_production.json');

/** Routes **/
router.use('/', swaggerUi.serve);
if (!process.env.PORT) {
    router.use('/', swaggerUi.setup(swaggerDoc));
} else {
    router.use('/', swaggerUi.setup(productionSwaggerDoc));
}

/** Exports **/
module.exports = router;