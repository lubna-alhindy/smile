const jwt = require('jsonwebtoken');
require('dotenv').config();

/// ---------------------------------- ///

exports.getPayload = async authHeader => {
    try {
        if( !authHeader || authHeader === '' ){
            return null;
        }
        const token = authHeader.split(' ')[1];
        if( token ) {
            return await jwt.verify(token, process.env.JWT_SECRET);
        }
        return null;
    }
    catch(error) {
        throw new Error("Unauthorized");
    }
};

/// ---------------------------------- ///