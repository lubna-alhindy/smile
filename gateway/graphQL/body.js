/// -------------------------------------- ///

function isAlpha(c) { // check if char can be belongs to resolver name
  return ('a' <= c && c <= 'z') || ('A' <= c && c <= 'Z') || (c === '_') || ('0' <= c && c <= '9');
}

/// -------------------------------------- ///

function fixQuery(query) {
  if (!query || !query.length) return null;
  query = query.substr(query[0] === 'q' ? 6 : (query[0] === 'm' ? 9 : 13));
  query = query.substr(0, query.length - 1);
  query = query.replace(/ /g, '');
  return query;
}

/// -------------------------------------- ///

exports.getBody = async query => {
  query = fixQuery(query);
  if (!query) return {};

  let res = {} ,cnt = 0, state = 0, subQuery = "", resolverName = "";
  for (let c of query) {
    if (state === 0) { // do nothing
      if (isAlpha(c)) { // find start of query
        state = 1;
        resolverName += c;
        subQuery += c;
      }
    } else if (state === 1) { // fill the name of resolver
      if (isAlpha(c)) { // char from the resolver name
        resolverName += c;
      } else { // char dont belongsTo resolver name
        if (c === '(') { // args bracket
          state = 2;
        } else if (c === '{') { // body bracket
          state = 3;
          cnt = 1;
        } else if (c === '\n') { // maybe resolver has a complete in the next line
          state = 4;
        }
      }
      subQuery += c;
    } else if (state === 2) { // combain all args of resolver
      if (c === ')') {
        state = 4;
      }
      subQuery += c;
    } else if (state === 3) { // combain whole body of the resolver
      if (c === '{') { // start of internal another body
        cnt += 1;
      } else if (c === '}') { // end of some internal-external body
        cnt -= 1;
      }
      subQuery += c;
      if (cnt === 0) { // the end of the resolver son add it to the res and init the variables
        res[resolverName] = subQuery;
        resolverName = "";
        subQuery = "";
        state = 0;
        cnt = 0;
      }
    } else if (state === 4) { // maybe resolver has a complete in the next line
      if (isAlpha(c)) { // char from the next resolver name so we should add the current one and init variables and start with the next one
        res[resolverName] = subQuery;
        resolverName = "";
        subQuery = "";
        state = 1;
        cnt = 0;
        resolverName += c;
      } else { // char dont belongsTo resolver name
        if (c === '(') { // args bracket
          state = 2;
        } else if (c === '{') { // body bracket
          state = 3;
          cnt = 1;
        }
      }
      subQuery += c;
    }
  }
  return res;
};

/// -------------------------------------- ///