const Url = require('../model/url.model');
const axios = require('axios');

// redirect to long/original url
const getLongUrl = async (req, res) => {
  try {
    const url = await Url.findOneAndUpdate(
      { backHalf: req.params.customSlug },
      { $inc: { clickCount: 1 } },
      { new: true }
    );

    const ip = 
        req.headers['cf-connecting-ip'] ||
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || '';

    if (url) {
      const click = {
        timestamp: new Date(),
        ipAddress: ip
      };

      if (!url.clicks) {
        url.clicks = [];
      }

      // Get geolocation information based on IP address
      const response = await axios.get(`https://ipapi.co/${click.ipAddress}/json/`);
      if (response.status === 200) {
        const { city } = response.data;
        click.city = city;
      }

      url.clicks.push(click);
      await url.save();

      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No URL found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
};

  
module.exports = {getLongUrl}
