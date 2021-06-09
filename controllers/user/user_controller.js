const UserModel = require('../../models/user/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const userController = {
    save: async(req, res) => {
        try {
            const params = req.body;
            const userModel = new UserModel();
            if (!validator.isEmpty(params.name) && validator.isEmail(params.email) && !validator.isEmpty(params.password)) {
                //2. Verificar que el correo no se encuentre registrado
                const email = await UserModel.findOne({ email: params.email.toLowerCase() })
                if (!email) {
                    //3. Encriptar la contraseña
                    const hash = await bcrypt.hash(params.password, 10)
                    if (!hash) {
                        return res.send('No se pudo encriptar la contraseña')
                    } else {
                        const date = new Date();
                        const fullDate = date.getDate() + '/' + (date.getMonth() + 1) + "/" + date.getFullYear()
                        userModel.name = params.name;
                        userModel.email = params.email.toLowerCase();
                        userModel.password = hash;
                        userModel.date = fullDate;
                        //4. Guardar el usuario
                        const user = await userModel.save({})
                        if (user) {
                            return res.status(201).send({
                                message: "Usuario registrado",
                                user
                            })
                        } else {
                            return res.send('No se pudo guardar el usuario')
                        }
                    }
                } else {
                    return res.send('El correo ya existe')
                }
            } else {
                return res.send("Los campos no son validos")
            }
        } catch (err) {
            return res.send(err)
        }

    },
    login: async(req, res) => {
        try {
            const params = req.body;
            console.log(params.email)
            if (validator.isEmail(params.email) && !validator.isEmpty(params.password)) {
                const user = await UserModel.findOne({ email: params.email.toLowerCase() })

                if (user) {
                    const password = await bcrypt.compare(params.password, user.password)
                    if (password) {
                        user.password = undefined
                        const token = await jwt.sign({ user }, 'portafolio', { expiresIn: '30d' })
                        return res.status(200).send({
                            message: "Login hecho",
                            token
                        })
                    } else {
                        return res.send('La contraseña no es correcta')
                    }
                } else {
                    return res.status(404).send({ message: "No existe el correo" })
                }
            } else {
                return res.send('Faltan datos')
            }
        } catch (error) {
            return res.status(500).send('Ocurrio un error en el servidor', error)
        }

    },
    getUser: async(req, res) => {
        try {
            const verify = await jwt.verify(req.token, 'portafolio');
            if (verify) {
                const payload = jwt.decode(req.token);
                // console.log(payload)
                const user = await UserModel.findById(payload.user._id, { password: 0 })
                if (user) {
                    return res.status(200).send({
                        message: "Usuaruio devuelto",
                        user
                    })
                } else {
                    return res.status(404).send({ message: "No se encontro el usuario" })
                }
            } else {
                return res.status(403).send({
                    message: "no se pudo verificar la autenticidad del token y no puedes acceder a la informacion"
                })
            }
        } catch (error) {
            return res.send(error)
        }
    },
    getRole: async(req, res) => {
        try {
            const verify = await jwt.verify(req.token, 'portafolio');
            if (verify) {
                const payload = jwt.decode(req.token);
                // console.log(payload)
                const user = await UserModel.findById(payload.user._id, { role: true })
                if (user) {
                    return res.status(200).send({
                        message: "Usuaruio devuelto",
                        user
                    })
                } else {
                    return res.status(404).send({ message: "No se encontro el usuario" })
                }
            } else {
                return res.status(403).send({
                    message: "no se pudo verificar la autenticidad del token y no puedes acceder a la informacion"
                })
            }
        } catch (error) {
            return res.send(error)
        }
    },
    updateUser: async(req, res) => {
        try {
            const verify = await jwt.verify(req.token, 'portafolio');
            if (verify) {
                const payload = jwt.decode(req.token);
                // console.log(payload)
                const data = req.body;
                const user = await UserModel.findByIdAndUpdate(payload.user._id, data, { new: true })
                if (user) {
                    return res.status(200).send({
                        message: "Usuario actualizar",
                        user
                    })

                } else {
                    return res.status(404).send({ message: "No se oudo actualizar el usuario" })
                }
            } else {
                return res.status(403).send({
                    message: "no se pudo verificar la autenticidad del token y no puedes acceder a la informacion"
                })
            }
        } catch (error) {
            return res.send(error)
        }
    },
    deleteUser: async(req, res) => {
        try {
            if (!validator.isEmpty(req.body.password)) {
                const verify = await jwt.verify(req.token, 'portafolio');
                if (verify) {
                    const payload = jwt.decode(req.token);
                    // console.log(payload)
                    const password = await UserModel.findById(payload.user._id, { password: true, _id: false })
                        // console.log(password)
                    const passwordCompare = await bcrypt.compare(req.body.password, password.password)
                    if (passwordCompare) {
                        const user = await UserModel.findByIdAndDelete(payload.user._id)
                        if (user) {
                            return res.status(200).send({
                                message: "Usuario borrado"
                            })
                        } else {
                            return res.status(404).send({ message: "No se pudo borrar el usuario" })
                        }
                    } else {
                        return res.send('Tu contraseña no es correcta')
                    }


                } else {
                    return res.status(403).send({
                        message: "no se pudo verificar la autenticidad del token y no puedes acceder a la informacion"
                    })
                }
            } else {
                return res.status(404).send({ message: "Falta la contraseña" })
            }

        } catch (error) {
            return res.send(error)
        }
    }
}
module.exports = userController;