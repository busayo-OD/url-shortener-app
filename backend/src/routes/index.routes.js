const indexRouter = require('express').Router();
const indexController = require('../controller/index.controller');

indexRouter.get('/:customSlug', indexController.getLongUrl);
module.exports = indexRouter;