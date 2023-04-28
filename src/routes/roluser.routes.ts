import {Router} from 'express';
import RolUserController from '../controllers/roluser.controller';

const router = Router();

router.get('/roluser/test',RolUserController.test);
router.get('/roluser/list/:username',RolUserController.listRoles);
router.post('/roluser/create',RolUserController.create);
router.put('/roluser/edit/:id',RolUserController.edit);
router.delete('/roluser/delete/:id',RolUserController.deleteRolUsuario);

export default router;