const express = require('express');
const router = express.Router();
const token = require('../../auth/jwt');
const projectController = require('../../controllers/public/project_controller');
// importar imagenes

router.post('/guardar-proyecto', token, projectController.save)
router.get('/get-proyecto/:id', projectController.getProject);
router.get('/get-proyectos', projectController.getProjects);
router.put('/actualizar-proyecto/:id', token, projectController.updateProject);
router.delete('/borrar-proyecto/:id', token, projectController.deleteProject);

module.exports = router;