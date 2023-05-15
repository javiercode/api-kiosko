import {Router} from 'express';
import controller from '../controllers/marca.controller';

const router = Router();

router.get('/marca/test',controller.test);
router.get('/marca/list/:page/:limit',controller.list);
router.get('/marca/list/:username',controller.listByUser);
router.post('/marca/create',controller.create);
router.put('/marca/edit/:id',controller.edit);
router.delete('/marca/delete/:id',controller.delete);

export default router;