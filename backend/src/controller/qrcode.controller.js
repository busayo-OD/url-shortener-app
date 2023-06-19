const qr = require('qrcode');
const Url = require('../model/url.model');

const generateQrCode = async (req, res, next) => {
    try {
        const { shortUrl } = req.body;
        const qrCode = await qr.toDataURL(shortUrl);
        const url = await Url.findOne({ shortUrl: req.body.shortUrl });
        
        url.qrCode = qrCode;
        await url.save();

        res.send(`<img src="${qrCode}" alt="QR Code">`);
    } catch (err) {
        next(err);
    }
}

module.exports = {generateQrCode}