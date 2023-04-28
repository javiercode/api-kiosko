import {Router} from 'express';
import controller from '../controllers/equipo.controller';

const router = Router();

router.get('/equipo/test',controller.test);
router.get('/equipo/list',controller.list);
router.post('/equipo/create',controller.create);
router.put('/equipo/edit/:id',controller.edit);
router.delete('/equipo/delete/:id',controller.delete);

export default router;