/** Required Varibles **/
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger.json');

/** Routes **/
router.use('/', swaggerUi.serve);
router.use('/', swaggerUi.setup(swaggerDoc));

/** Exports **/
module.exports = router;