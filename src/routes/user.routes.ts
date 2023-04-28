import {Router} from 'express';
import UserController from '../controllers/user.controller';

const router = Router ();
router.get('/usuario/test',UserController.test);
router.get('/usuario/list/:page/:limit',UserController.list);
router.post('/usuario/create',UserController.create);
router.put('/usuario/edit/:id',UserController.edit);
router.delete('/usuario/delete/:id',UserController.desactivar);

export default router;