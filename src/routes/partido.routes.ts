import {Router} from 'express';
import controller from '../controllers/partido.controller';

const router = Router();

router.get('/partido/test',controller.test);
router.get('/partido/list',controller.list);
router.post('/partido/list',controller.findFecha);
router.post('/partido/create',controller.create);
router.put('/partido/edit/:id',controller.edit);
router.delete('/partido/delete/:id',controller.delete);

export default router;