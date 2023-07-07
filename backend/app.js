const express = require('express');
const authRouter = require('./src/routes/auth.routes');
const urlRouter = require('./src/routes/url.routes');
const indexRouter = require('./src/routes/index.routes');
const qrCodeRouter = require('./src/routes/qrcode.routes')
const bodyParser = require('body-parser');
const cors = require('cors');

const YAML = require('yamljs');
const swaggerJSDocs = YAML.load('./api.yaml');
const swaggerUI = require('swagger-ui-express')

const app = express()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));

app.use('/auth', authRouter);
app.use('/urls', urlRouter);
app.use('/', indexRouter);
app.use('/qr', qrCodeRouter);

// home route
app.get('/', (req, res) => {
    return res.json({ status: true })
})

// 404 route
app.use('*', (req, res) => {
    return res.status(404).json({ message: 'route not found' })
})


module.exports = app