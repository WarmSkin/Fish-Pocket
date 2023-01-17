import { Router } from 'express'
import * as usersCtrl from '../controllers/users.js'

const router = Router()

router.get('/', usersCtrl.index)
router.get('/:id/edit', usersCtrl.editUser)
router.post('/habits', usersCtrl.createHabit)
router.get('/:id/editH', usersCtrl.editHabit)
router.get('/maintenance', usersCtrl.maintenance)
router.delete('/:id/u', usersCtrl.delete)
router.delete('/:id/h', usersCtrl.deleteHabit)
router.put('/:id/updateUser', usersCtrl.updateUser)
router.put('/:id/updateH', usersCtrl.updateHabit)

export {
  router
}