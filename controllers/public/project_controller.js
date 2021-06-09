const ProjectModel = require('../../models/public/project_model');
const jwt = require('jsonwebtoken');
const path = require('path');
const projectController = {
    save: async(req, res) => {
        try {
            const verify = await jwt.verify(req.token, 'portafolio')
            if (!verify) return res.status(403).send({ message: "No tienes permisos para crear un proyecto" })
            if (verify) {
                const params = req.body;
                console.log(req.body)
                const projectModel = new ProjectModel();
                const payload = jwt.decode(req.token, 'portafolio');
                const date = new Date();
                const fullDate = date.getDate() + '/' + (date.getMonth() + 1) + "/" + date.getFullYear()
                projectModel.title = params.title;
                projectModel.description = params.description;
                projectModel.fullDate = fullDate;
                projectModel.author = payload.user.name;
                projectModel.idUser = payload.user._id;
                const project = await projectModel.save({});
                if (!project) return res.send('No se pudo guardar el proyecto')
                return res.status(201).send({ message: "Proyecto creado", project })
            }
        } catch (error) {
            return res.send(error)
        }
    },
    getProject: async(req, res) => {
        try {
            const id = req.params.id;
            const project = await ProjectModel.findOne({ urlProject: id });
            if (project) return res.status(200).send({ message: "Proyecto devuelto", project })
                // return res.status(404).send({ message: "No se encontro el proyecto" })
        } catch (error) {
            return res.send({ error })
        }
    },
    getProjects: async(req, res) => {
        try {
            const id = req.params.id
            const projects = await ProjectModel.find();
            if (projects) return res.status(200).send({ message: "Proyectos devueltos", projects })
            return res.status(404).send({ message: "No se encontro ningun proyecto" })
        } catch (error) {
            return res.send({ error })
        }
    },
    updateProject: async(req, res) => {
        try {
            const verify = jwt.verify(req.token, 'portafolio');
            if (verify) {
                const payload = jwt.decode(req.token);

                const id = req.params.id;
                const project = await ProjectModel.findOne({ urlProject: id })
                if (!project) return res.status(404).send({ message: "No existe el proyecto" })
                if (project) {
                    console.log(project, payload.user._id)
                    if (project.idUser === payload.user._id) {
                        const update = req.body;
                        const updateProject = await ProjectModel.findOneAndUpdate({ urlProject: id }, update, { new: true })
                        if (!updateProject) return res.send("No se pudo actualizar")
                        return res.status(200).send({
                            message: "Datos actualizado",
                            project: updateProject
                        })
                    } else {
                        return res.send('No puedes modificar este proyecto que no te pertenece')
                    }
                }
            } else {
                return res.status(403).send({ message: "No puedes actualizar proyecto" })
            }
        } catch (error) {
            return res.send({ error })
        }
    },
    deleteProject: async(req, res) => {
        try {
            const verify = jwt.verify(req.token, 'portafolio');
            if (verify) {
                const payload = jwt.decode(req.token);
                const id = req.params.id;

                const project = await ProjectModel.findById(id)
                if (!project) return res.status(404).send({ message: "No existe el proyecto" })
                if (project) {
                    console.log(project)
                    if (project.idUser === payload.user._id || payload.user.role == 'admin') {
                        const delProject = await ProjectModel.findByIdAndDelete(id)
                        if (!delProject) return res.send("No se pudo borrar")
                        return res.status(200).send({
                            message: "Proyecto borrado",
                        })
                    } else {
                        return res.send('No puedes borrar este proyecto que no te pertenece')
                    }
                }
            } else {
                return res.status(403).send({ message: "No puedes borrar proyectos" })
            }
        } catch (error) {
            return res.send({ error })
        }
    }




}
module.exports = projectController;