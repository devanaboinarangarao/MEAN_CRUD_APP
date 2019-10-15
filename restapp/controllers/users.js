const mongoUtil = require('../utils/mongo');
const config = require('../config/development.json');
const bcrypt = require('bcryptjs');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');

exports.createUser = async (apiReq, apiRes, next) => {
    try {
        let { email, name, password, confirmPassword, address } = apiReq.body;
        if (email && name && address) {
            let db = await mongoUtil.getDb();

            // console.log(db);
            console.log(config.mongodb.collection)
            db.collection(config.mongodb.collection).findOne({ email: email }, async (err, userDoc) => {
                console.log(err, userDoc);
                if (err) throw err;
                if (userDoc && Object.keys(userDoc).length > 0) {
                    return apiRes.status(200).send({ message: 'User already registered', success: true });
                } else {
                    // let encPass = bcrypt.hashSync(password, 12);
                    db.collection(config.mongodb.collection).insertOne({ email: email, name: name, address: address, password: password }, (err, insertres) => {
                        if (err) throw err;
                        console.log(insertres.result);
                    })
                    try {
                        let token = await jwt.sign({ 'email': email, 'name': name, 'address': address, 'password': password }, 'mysecret', {expiresIn :'1hr'});
                        console.log(token);
                        return apiRes.status(200).send({ message: 'Successfully inserted', success: true, token : token })
                    } catch(err) {
                        throw err;
                    }
                }
            })
        } else {
            return apiRes.status(402).send({ message: "Bad Params Error", success: false });
        }
    } catch (err) {
        console.log(err);
        next();
    }
}
exports.getUsers = async (apiReq, apiRes, next) => {
    try {
        console.log("Hitted ::::::")
        let db = await mongoUtil.getDb();

        // console.log(db);
        console.log(config.mongodb.collection)
        db.collection(config.mongodb.collection).find({},{password : 0}).toArray((err, userDocs) => {
            console.log(err, userDocs);
            if (err) throw err;
            return apiRes.status(200).send({ message: 'Successfully fetehced', success: true, data : userDocs })
        })
    } catch (err) {
        console.log(err);
        next();
    }
}
exports.getUser = async (apiReq, apiRes, next) => {
    try {
        let user_id = apiReq.params.user_id;
        console.log("Hitted ::::::", user_id)
        let db = await mongoUtil.getDb();

        // console.log(db);
        // console.log(config.mongodb.collection)
        db.collection(config.mongodb.collection).findOne({_id : ObjectId(user_id)}, (err, userDocs) => {
            console.log(err, userDocs);
            if (err) throw err;
            return apiRes.status(200).send({ message: 'Successfully fetched', success: true, data : userDocs })
        })
    } catch (err) {
        console.log(err);
        next();
    }
}
exports.deleteUser = async (apiReq, apiRes, next) => {
    console.log(apiReq.params.user_id);

    try {
        let user_id = apiReq.params.user_id;
        let bodyObj = apiReq.body;
       
        let db = await mongoUtil.getDb();


        db.collection(config.mongodb.collection).deleteOne({_id: ObjectId(user_id)}, bodyObj,(err, res) => {
            console.log(err, res);
            if (err) throw err;
            return apiRes.status(200).send({ message: 'Successfully Deleted', success: true })
        })
    } catch(err) {
        console.log(err);
        next();
    }
}
exports.updateUser = async (apiReq, apiRes, next) => {
    console.log("Route Hitted :::")
    console.log(apiReq.body);


    try {
        let user_id = apiReq.params.user_id;
        let bodyObj = apiReq.body;
       
        let db = await mongoUtil.getDb();


        db.collection(config.mongodb.collection).replaceOne({_id: ObjectId(user_id)}, bodyObj,(err, res) => {
            console.log(err, res);
            if (err) throw err;
            return apiRes.status(200).send({ message: 'Successfully Updated', success: true })
        })
    } catch(err) {
        console.log(err);
        next();
    }
}