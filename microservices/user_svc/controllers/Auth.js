const jwt = require('jsonwebtoken');
const dev = require('../config/dev');

exports.getPayload = async (authHeader) => {
    if( authHeader === '' ){
        return null;
    }

    const token = authHeader.split(' ')[1];

    try {
        if( token ) {
            return await jwt.verify(token, dev.JWT_SECRET);
        }
        return null;
    }
    catch(error) {
        return null;
    }
};