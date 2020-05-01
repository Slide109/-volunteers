// eslint-disable-next-line @typescript-eslint/no-var-requires
const withImages = require('next-images');
const path = require('path');
require('dotenv').config()

module.exports = withImages({
    webpack: config => {
        config.resolve.alias['~'] = path.join(__dirname, 'src');
        config.node = {
            fs: 'empty'
        };
        return config;
    },
    publicRuntimeConfig: {
        mapToken: process.env.MAPBOX_GL_TOKEN,
        endpoint: process.env.ENDPOINT
    }
});
