import { Router } from 'express'
import * as usersCtrl from '../controllers/users.js'
import { isLoggedIn, isManager } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, usersCtrl.index)
router.get('/mypage', isLoggedIn, usersCtrl.show)
router.get('/:id/edit', isLoggedIn, usersCtrl.editUser)
router.get('/:id/editH', usersCtrl.editHabit)
router.get('/maintenance', isLoggedIn, isManager, usersCtrl.maintenance)
router.get('/:fid/friend', isLoggedIn, usersCtrl.showFriend)
router.get('/:fid/afish', isLoggedIn, usersCtrl.showFish)
router.post('/:id/sendMessage', isLoggedIn, usersCtrl.sendMessage)
router.post('/:id/sendMessageF', isLoggedIn, usersCtrl.sendMessageF)
router.post('/:pid/fishing', usersCtrl.addFish)
router.post('/habits', usersCtrl.createHabit)
router.post('/:pid/addFriend', isLoggedIn, usersCtrl.addFriend)
router.post('/:fid/addComment', usersCtrl.addComment)
router.delete('/:fid/:cid/deleteComment', isLoggedIn, usersCtrl.deleteComment)
router.delete('/:mid/deleteMessage', isLoggedIn, usersCtrl.deleteMessage)
router.delete('/:id/deleteFriend', isLoggedIn, usersCtrl.deleteFriend)
router.delete('/:id/u', usersCtrl.delete)
router.delete('/:id/h', usersCtrl.deleteHabit)
router.put('/:id/updateUser', usersCtrl.updateUser)
router.put('/:id/updateH', usersCtrl.updateHabit)

export {
  router
}