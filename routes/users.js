import { Router } from 'express'
import * as usersCtrl from '../controllers/users.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, usersCtrl.index)
router.get('/mypage', isLoggedIn, usersCtrl.show)
router.get('/:id/edit', isLoggedIn, usersCtrl.editUser)
router.get('/:id/editH', usersCtrl.editHabit)
router.get('/maintenance', usersCtrl.maintenance)
router.post('/:pid/fishing', usersCtrl.addFish)
router.post('/habits', usersCtrl.createHabit)
router.post('/:pId/addFriend', isLoggedIn, usersCtrl.addFriend)
router.delete('/:id/u', usersCtrl.delete)
router.delete('/:id/h', usersCtrl.deleteHabit)
router.put('/:id/updateUser', usersCtrl.updateUser)
router.put('/:id/updateH', usersCtrl.updateHabit)

export {
  router
}