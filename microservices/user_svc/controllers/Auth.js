const jwt = require('jsonwebtoken');
require('dotenv');

/// ---------------------------------- ///

exports.getPayload = async authHeader => {
    if( !authHeader || authHeader === '' ){
        return null;
    }

    const token = authHeader.split(' ')[1];

    try {
        if( token ) {
            return await jwt.verify(token, process.env.JWT_SECRET);
        }
        return null;
    }
    catch(error) {
        return null;
    }
};

/// ---------------------------------- ///