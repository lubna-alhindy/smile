const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
        "config.JsonWebTokenSecret",
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