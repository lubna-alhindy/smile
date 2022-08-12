const {getBanState} = require("./getBanState");
const {checkToken} = require("./checkToken");
const {authorize} = require("./authorize");

/// ------------------------------------- ///

exports.getAuthorization = async (token, resolverName) => {
  const payload = await checkToken(token);
  if( !payload ){
    return false;
  }

  const isBaned = await getBanState(payload.id);
  if( isBaned ){
    return false;
  }

  const auth = await authorize(payload.roleName ,resolverName);
  if( !auth ){
    return false;
  }

  return true;
};

/// ------------------------------------- ///