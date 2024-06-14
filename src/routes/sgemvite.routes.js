import { Router } from 'express';
import { createEquipo, deleteEquipo, getEquipoById, getEquipos, updateEquipo } from '../controllers/sgemvite.controller.js';



const router = Router();

router.get('/equipos', getEquipos);
router.get('/equipos/:id_equipo', getEquipoById);
router.post('/equipos', createEquipo);
router.put('/equipos/:id_equipo', updateEquipo);
router.delete('/equipos/:id_equipo', deleteEquipo);

export default router;