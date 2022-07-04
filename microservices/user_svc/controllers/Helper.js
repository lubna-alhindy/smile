const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

// -------------------------------------------- //

const {writeFileSync ,unlinkSync ,existsSync, mkdirSync} = require("fs");
const {join} = require("path");

/// --------------------------- ///

exports.writeImage = async (image ,name) => {
    if( !image || name === '' ){
        return false;
    }

    let filePath = join(
      __dirname,
      "..",
      "assets"
    );

    if( !existsSync(filePath) ){
        mkdirSync(filePath);
    }

    filePath = join(
      filePath,
      'images'
    );

    if( !existsSync(filePath) ){
        mkdirSync(filePath);
    }

    filePath = join(
      filePath,
      name
    );

    await writeFileSync(filePath, image);
    return true;
};

/// --------------------------- ///

exports.deleteImage = async name => {
    if( name === '' ){
        return;
    }

    let filePath = join(
      __dirname,
      "..",
      "assets"
    );

    if( !existsSync(filePath) ){
        mkdirSync(filePath);
    }

    filePath = join(
      filePath,
      'images'
    );

    if( !existsSync(filePath) ){
        mkdirSync(filePath);
    }

    filePath = join(
      filePath,
      name
    );

    if( existsSync(filePath) ){
        await unlinkSync(filePath);
    }
};

/// --------------------------- ///

exports.uniqueName = suffix => {
    const date = new Date();

    return date.toLocaleDateString('sv') + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds() + '-' + date.getMilliseconds() + '-' + suffix.toString();
};

/// --------------------------- ///

exports.convertBase64ToImage = base64 => {
    const image = Buffer.from(base64, "base64");
    if( !image ){
        return null;
    }

    return image;
};

/// --------------------------- ///