const usersService = require('../controllers/users');
const isAuth = require('../middlewares/auth').isAuth;
const errorHandle = require('../middlewares/errorHandler').errorHandler;
const router = require('express').Router();
// console.log("in Routes file")

router.get('/fetchUsers', isAuth, usersService.getUsers, errorHandle);
router.get('/fetchUser/:user_id',isAuth, usersService.getUser, errorHandle);
router.post('/createUser', usersService.createUser, errorHandle);
router.put('/updateUser/:user_id',isAuth,  usersService.updateUser, errorHandle);
router.delete('/deleteUser/:user_id',isAuth,  usersService.deleteUser, errorHandle);
router.use('*', (apiReq, apiRes) => {
    apiRes.send("Path Not Found")
});

module.exports = router;