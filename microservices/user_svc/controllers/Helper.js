const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {readFileSync ,writeFileSync ,unlinkSync ,existsSync, mkdirSync} = require("fs");
const {join} = require("path");

const graphql = require('graphql');
const graphqlLanguage = require('graphql/language');

// -------------------------------------------- //

exports.checkPassword = async (inputPassword, realPassword) => {
    return await bcrypt.compare(inputPassword, realPassword);
}

// -------------------------------------------- //

exports.hashPassword = async password => {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);

    // now we set user password to hashed password
    return await bcrypt.hash(password, salt);
}

// -------------------------------------------- //

exports.generateToken = payload => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
    );
}

// -------------------------------------------- //

exports.fromStringToDate = strDate => {
    // --- function take string (yyyy/mm/dd) --- //

    // get time in milliseconds from 1970
    const timeInMilliseconds = Date.parse(strDate);

    // convert it to date object
    return new Date(timeInMilliseconds);
}

// -------------------------------------------- //

exports.resolverMap = {
    Date: new graphql.GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === graphqlLanguage.Kind.INT) {
                return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        },
    }),
}

// -------------------------------------------- //

exports.Void = {
    Void : new graphql.GraphQLScalarType({
        name: 'Void',

        description: 'Represents NULL values',

        serialize() {
            return null
        },

        parseValue() {
            return null
        },

        parseLiteral() {
            return null
        }
    })
}

/// --------------------------- ///

exports.writeImage = async (image ,name) => {
    try {
        if (!image || name === '') {
            return false;
        }

        let filePath = join(
          __dirname,
          "..",
          "assets"
        );

        if (!existsSync(filePath)) {
            mkdirSync(filePath);
        }

        filePath = join(
          filePath,
          'images'
        );

        if (!existsSync(filePath)) {
            mkdirSync(filePath);
        }

        filePath = join(
          filePath,
          name
        );

        await writeFileSync(filePath, image);
        return filePath;
    }
    catch(err){
        throw new Error(err);
    }
};

/// --------------------------- ///

exports.deleteImage = async name => {
    try {
        if (name === '') {
            return;
        }

        let filePath = join(
          __dirname,
          "..",
          "assets"
        );

        if (!existsSync(filePath)) {
            mkdirSync(filePath);
        }

        filePath = join(
          filePath,
          'images'
        );

        if (!existsSync(filePath)) {
            mkdirSync(filePath);
        }

        filePath = join(
          filePath,
          name
        );

        if (existsSync(filePath)) {
            await unlinkSync(filePath);
        }
    }
    catch(err){
        throw new Error(err);
    }
};

/// --------------------------- ///

exports.getImagePath = name => {
    try {
        let filePath = join(
          __dirname,
          "..",
          "assets"
        );

        if (!existsSync(filePath)) {
            mkdirSync(filePath);
        }

        filePath = join(
          filePath,
          'images'
        );

        if (!existsSync(filePath)) {
            mkdirSync(filePath);
        }

        filePath = join(
          filePath,
          name
        );

        return filePath;
    }
    catch(err){
        throw new Error(err);
    }
};

/// --------------------------- ///

exports.uniqueName = suffix => {
    const date = new Date();

    return date.toLocaleDateString('sv') + '-' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds() + '-' + date.getMilliseconds() + '-' + suffix.toString();
};

/// --------------------------- ///

exports.convertBase64ToImage = base64 => {
    try {
        const image = Buffer.from(base64, "base64");

        return !image ? null : image;
    }
    catch(err){
        throw new Error(err);
    }
};

/// --------------------------- ///

exports.convertImageToBase64 = filePath => {
    try {
        return readFileSync(filePath ,'base64');
    }
    catch(err){
        throw new Error(err);
    }
}

/// --------------------------- ///