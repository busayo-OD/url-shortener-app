const Url = require('../model/url.model');

// redirect to long/original url
const getLongUrl = async (req, res) => {
    try {
        const url = await Url.findOne({backHalf: req.params.customSlug})

        if(url) {
            url.clicks++
            await url.save();

            const clickSource = req.headers.referer || 'Direct';
            url.clickSources.push(clickSource);

            await url.save()
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No url found')
        }

    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
}

module.exports = {getLongUrl}
