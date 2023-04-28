import {Router} from 'express';
import controller from '../controllers/movimiento.controller';

const router = Router();

router.get('/apuesta/test',controller.test);
router.get('/apuesta/list',controller.list);
router.post('/apuesta/create',controller.create);
router.put('/apuesta/edit/:id',controller.edit);
router.delete('/apuesta/delete/:id',controller.delete);

export default router;