import {Router} from 'express';
import controller from '../controllers/movimiento.controller';

const router = Router();

router.get('/movimiento/test',controller.test);
router.get('/movimiento/list/:page/:limit',controller.list);
router.post('/movimiento/create',controller.create);
router.post('/movimiento/createAll',controller.createAll);
router.put('/movimiento/edit/:id',controller.edit);
router.delete('/movimiento/delete/:id',controller.delete);

export default router;