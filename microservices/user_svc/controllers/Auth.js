const jwt = require('jsonwebtoken');

exports.getPayload = async (authHeader) => {
    if( !authHeader || authHeader === null || authHeader === '' ){
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