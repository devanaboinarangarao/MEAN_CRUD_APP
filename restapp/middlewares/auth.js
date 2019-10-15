const jwt = require('jsonwebtoken')

module.exports.isAuth = async (apiReq, apiRes, next) => {
    
    try {
        // console.log(apiReq.headers)
        if(apiReq.get('Authorization')) {
            const token = apiReq.get('authorization').split(" ")[1];
            let res = await jwt.verify(token, 'mysecret');
    
            console.log(res);
    
            next();
        } else {
            apiRes.status(500).send("Something went wrong");
        }
    } catch(errr) {
        console.log(errr);
        apiRes.status(500).send("Token Invalid");
    }
}