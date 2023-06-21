const qr = require('qrcode');
const Url = require('../model/url.model');

const generateQrCode = async (req, res, next) => {
    const { id } = req.params;
    try {
        const url = await Url.findById(id);
  
        if (!url) {
            console.log("Url not found");
            return res.status(404).send({ error: 'Url not found' });
        }

        const genUrl = url.shortUrl;
        const qrCode = await qr.toDataURL(genUrl);
        
        url.qrCode = qrCode;
        await url.save();
        return res.status(200).json({QrCode:qrCode});
        
    } catch (err) {
        next(err);
    }
}

module.exports = {generateQrCode}