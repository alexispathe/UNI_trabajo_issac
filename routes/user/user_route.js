const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/user_controller');
const token = require('../../auth/jwt');


router.post('/register', userController.save);
router.post('/login', userController.login);
router.get('/user', token, userController.getUser);
router.get('/role', token, userController.getRole);
router.put('/actualizar-usuario', token, userController.updateUser);
router.delete('/borrar-usuario', token, userController.deleteUser);
module.exports = router;