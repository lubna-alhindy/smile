const jwt = require('jsonwebtoken');
require('dotenv').config();

/// ---------------------------------- ///

exports.checkToken = async (args ,context) => {
    try {
        if( !args.token || args.token === '' ){
            return null;
        }
        return await jwt.verify(args.token, process.env.JWT_SECRET);
    }
    catch(error) {
        throw new Error("Unauthorized");
    }
};

/// ---------------------------------- ///