const Url = require('../model/url.model');
const validUrl = require('valid-url');
const shortid = require('shortid');
const User = require('../model/user.model');
require('dotenv').config();

const createShortUrl = async (req, res, next) => {
  try {
    const { longUrl, backHalf, title, tags } = req.body;
    const baseUrl = process.env.BASE_URL;

    if (!validUrl.isUri(baseUrl)) {
      return res.status(400).json('Invalid base URL');
    }

    const urlCode = backHalf || shortid.generate();
    const existingUrlCode = await Url.findOne({ urlCode });

    if (existingUrlCode) {
      return res.status(400).send('BackHalf is already taken. Please choose another one.');
    }

    if (!validUrl.isUri(longUrl)) {
      return res.status(400).json('Invalid long URL');
    }

    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        return res.json(url);
      }

      const shortUrl = `${baseUrl}/${urlCode}`;

      const newUrl = new Url({
        longUrl,
        shortUrl,
        backHalf: urlCode,
        title,
        tags,
        owner: req.user.id,
        date: new Date()
      });

      const user = req.user;
      const savedUrl = await newUrl.save();
      user.urls.push(savedUrl._id);
      await user.save();
      res.status(201).json(savedUrl);
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } catch (err) {
    next(err);
  }
};


const editShortUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = Object.keys(req.body);
    const user = req.user._id;
    const baseUrl = process.env.BASE_URL;
    const allowedUpdate = ['backHalf', 'title', 'tags'];
    const isValidOperation = update.every((key) => allowedUpdate.includes(key));

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    const url = await Url.findById(id);

    if (!url) {
      console.log("Url not found");
      return res.status(404).send({ error: 'Url not found' });
    }

    if (user.toString() !== url.owner.toString()) {
      console.log('You are not the owner');
      return res.status(403).json({ status: false, url: null });
    }

    update.forEach((key) => {
      url[key] = req.body[key];
    });

    await url.save();
    url.shortUrl = `${baseUrl}/${url.backHalf}`;
    await url.save();
    return res.status(200).json(url);

  } catch (err) {
    console.log(err);
    next(err);
  }
};

  

  const myUrls = async (req, res, next) => {
    try {
        const user = await User.findOne(req.user._id)
            .populate({
                path: 'urls',
                options: { sort: { date: -1 } } 
            })
            .exec();

        return res.status(200).json(user.urls);
    } catch (err) {
        next(err);
    }
}


const getShortUrlById = async (req, res, next) => {
  const { id } = req.params;
    try{
        const url = await Url.findById(id)
        return res.status(200).json(url)

    } catch(err){
      next(err);
    }   
}

module.exports = {createShortUrl, editShortUrl, myUrls, getShortUrlById}
