const urlRouter = require('express').Router();
const urlController = require('../controller/url.controller');
const auth = require('../middleware/auth')


urlRouter.post('/shorten', auth, urlController.createShortUrl);
urlRouter.get('', auth, urlController.myUrls);
urlRouter.patch('/edit/:id', auth, urlController.editShortUrl);
urlRouter.get('/:id', urlController.getShortUrlById);


module.exports = urlRouter;