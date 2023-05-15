import {Router} from 'express';
import controller from '../controllers/producto.controller';

const router = Router();

router.get('/producto/test',controller.test);
router.get('/producto/list/:page/:limit',controller.list);
router.get('/producto/:codigo',controller.getCodigo);
router.get('/producto/qr/:id',controller.qr);
router.get('/producto/qr-img/:id',controller.qrImg);
router.post('/producto/create',controller.create);
router.put('/producto/edit/:id',controller.edit);
router.delete('/producto/delete/:id',controller.delete);

export default router;