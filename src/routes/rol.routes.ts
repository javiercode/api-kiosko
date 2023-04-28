import {Router} from 'express';
import RolUserController from '../controllers/rol.controller';

const router = Router();

router.get('/rol/test',RolUserController.test);
router.get('/rol/list',RolUserController.list);
router.post('/rol/create',RolUserController.create);
router.put('/rol/edit/:id',RolUserController.edit);
router.delete('/rol/delete/:id',RolUserController.delete);

export default router;