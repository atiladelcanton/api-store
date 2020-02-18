'use strict'

const config = require('../config');
const fs = require('fs');
const mime = require('mime');

exports.upload = async (body, imageName) => {
    let matches = body.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let response = {};
    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');

    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;

    let extension = mime.getExtension(type);
    let fileName = imageName + '.' + extension;

    fs.writeFileSync(config.pathBase + fileName, imageBuffer, 'utf8');

    return fileName;
}