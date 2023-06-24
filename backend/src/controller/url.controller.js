const Url = require('../model/url.model');
const validUrl = require('valid-url');
const shortid = require('shortid');
const User = require('../model/user.model');
require('dotenv').config();

const createShortUrl = async (req, res, next) => {
    try {
        const { longUrl, backHalf, title, tags } = req.body;
        const baseUrl = process.env.BASE_URL

        // check base url
        if(!validUrl.isUri(baseUrl)) {
            return res.status(400).json('Invalid base url')
        }

        // Generate a unique short ID if backHalf is not provided
        const urlCode = backHalf || shortid.generate();
        const existingUrlCode = await Url.findOne({ urlCode})
        if (existingUrlCode) {
            return res.status(400).send('BackHalf is already taken. Please choose another one.');
          }

        // check long url
        if(validUrl.isUri(longUrl)) {
            try {
                let url = await Url.findOne({longUrl})
                if(url) {
                    res.json(url);
                } else {
                    const shortUrl = baseUrl + '/' + urlCode;

                    const newUrl = new Url({
                        longUrl,
                        shortUrl,
                        backHalf:urlCode,
                        title,
                        tags,
                        owner: req.user.id,
                        date: new Date(),
                        
                    });

                    const user = req.user;
                    const savedUrl = await newUrl.save();
                    user.urls.push(savedUrl._id); // Change concat to push to add the savedUrl ID
                    await user.save();
                    res.status(201).json(savedUrl);
                }
            } catch (err) {
                console.error(err);
                res.status(500).json('Server error');
            }
        } else {
            res.status(400).json('Invalid long url')
        }

    } catch (err) {
        next(err);
    }
}

const editShortUrl = async (req, res, next) => {
    const { id } = req.params;
    const update = Object.keys(req.body);
    const user = req.user._id;
    const baseUrl = process.env.BASE_URL
    const allowedUpdate = ['backHalf', 'title', 'tags'];
    const isValidOperation = update.every((update) => allowedUpdate.includes(update));
  
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }
  
    try {
      const url = await Url.findById(id);
  
      if (!url) {
        console.log("Url not found");
        return res.status(404).send({ error: 'Url not found' });
      }
  
      update.forEach((key) => {
        url[key] = req.body[key];
      });
  
      if (user.toString() !== url.owner.toString()) {
        console.log('You are not the owner');
        return res.status(403).json({ status: false, url: null });
      }
      await url.save();
      url.shortUrl = baseUrl + '/' + url.backHalf;
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
