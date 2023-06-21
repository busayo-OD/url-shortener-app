const qrCodeRouter = require('express').Router();
const qrCodeController = require('../controller/qrcode.controller');
const auth = require('../middleware/auth')

qrCodeRouter.post('/create/:id', auth, qrCodeController.generateQrCode);

module.exports = qrCodeRouter;