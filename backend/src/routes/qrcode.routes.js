const qrCodeRouter = require('express').Router();
const qrCodeController = require('../controller/qrcode.controller');

qrCodeRouter.post('/create', qrCodeController.generateQrCode);

module.exports = qrCodeRouter;