import {Router} from 'express';
import controller from '../controllers/producto.controller';

const router = Router();

router.get('/producto/test',controller.test);
router.get('/producto/list',controller.list);
router.post('/producto/list',controller.findFecha);
router.post('/producto/create',controller.create);
router.get('/producto/qr/:id',controller.qr);
router.put('/producto/edit/:id',controller.edit);
router.delete('/producto/delete/:id',controller.delete);

export default router;