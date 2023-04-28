import {Router} from 'express';
import controller from '../controllers/grupo.controller';

const router = Router();

router.get('/grupo/test',controller.test);
router.get('/grupo/list',controller.list);
router.get('/grupo/list/:username',controller.listByUser);
router.post('/grupo/create',controller.create);
router.put('/grupo/edit/:id',controller.edit);
router.delete('/grupo/delete/:id',controller.delete);

export default router;