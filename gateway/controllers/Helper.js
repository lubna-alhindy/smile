const graphql = require('graphql');
const graphqlLanguage = require('graphql/language');

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

const {existsSync ,mkdirSync} = require('fs');
const {join} = require('path');

// -------------------------------------------- //

exports.uniqueName = (suffix) => {
    const date = new Date();

    const name
      = date.toLocaleDateString('sv')
      + date.getHours() + '-'
      + date.getMinutes() + '-'
      + date.getSeconds() + '-'
      + date.getMilliseconds() + '-'
      + suffix.toString();

    return new Buffer(name).toString("base64");
};

exports.getUploadPath = (folder ,service) => {
    let filePath = join(__dirname ,".." ,".." ,"microservices" ,service ,"upload");
    if( !existsSync(filePath) ){
        mkdirSync(filePath);
    }

    filePath = join(filePath ,folder);
    if( !existsSync(filePath) ){
        mkdirSync(filePath);
    }

    return filePath;
};

// -------------------------------------------- //
