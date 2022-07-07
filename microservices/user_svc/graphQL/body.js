/*
    Notes for get the required fields:

        - you have to for loop over fieldNodes because each one is individual query

        - the required field name exist in this path:
            - info.fieldNodes[i].selectionSet.selections[j].name.value

        - you have to make a recursive function because there is types inside each other.

        - you have to make a string with the resault required fields and send it by graphql-request
          to the other services.

        Example about level 0 get required fields:
        for(let i = 0 ; i < info.fieldNodes[0].selectionSet.selections.length ; i++){
            console.log(info.fieldNodes[0].selectionSet.selections[i].name.value)
        }

        output the full info about the request from info object:

        getUser: (root, args, context ,info) => {
            console.log(JSON.stringify(info.fieldNodes.length,null,2));
            return Controller.User.getUser(args ,context);
        }


        inside res object if the typeof res[x] is object then there is required
        fields inside res[x]
*/

async function requiredField(field) {
    const name = field.name.value;

    if (!field.selectionSet) {
        return name;
    }

    let res = {};
    res[name] = [];
    for (let i = 0; i < field.selectionSet.selections.length; i++) {
        res[name].push(await requiredField(field.selectionSet.selections[i]));
    }

    return res;
}

exports.requiredFields = async (info) => {
    let res = [];

    for(let i = 0 ; i < info.fieldNodes.length ; i++){
        res.push(await requiredField(info.fieldNodes[i]));
    }

    return res;
};

exports.checkIfExist = async (body ,field) => {
    if( typeof body != "object" ){
        return body === field;
    }

    let res = false;

    for(let i in body){
        if( typeof body[i] === "object" ){
            if( i === field ){
                res = true;
                break;
            }
            res |= await this.checkIfExist(body[i] ,field);
        } else {
            res |= await this.checkIfExist(body[i] ,field);
        }

        if( res ){
            break;
        }
    }

    return res;
};