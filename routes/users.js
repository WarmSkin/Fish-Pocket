import { Router } from 'express'
import * as usersCtrl from '../controllers/users.js'

const router = Router()

router.get('/', usersCtrl.index)
router.get('/maintenance', usersCtrl.maintenance)
router.get('/:id/editH', usersCtrl.editHabit)
router.post('/habits', usersCtrl.createHabit)
router.delete('/:id/h', usersCtrl.deleteHabit)
router.put('/:id/updateH', usersCtrl.updateHabit)

export {
  router
}