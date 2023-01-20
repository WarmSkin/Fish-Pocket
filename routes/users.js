import { Router } from 'express'
import * as usersCtrl from '../controllers/users.js'
import { isLoggedIn, isManager } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, usersCtrl.index)
router.get('/mypage', isLoggedIn, usersCtrl.show)
router.get('/:id/edit', isLoggedIn, usersCtrl.editUser)
router.get('/:fid/afish', isLoggedIn, usersCtrl.showFish)
router.get('/:fid/friend', isLoggedIn, usersCtrl.showFriend)
router.get('/:id/editH', isLoggedIn, isManager, usersCtrl.editHabit)
router.get('/maintenance', isLoggedIn, isManager, usersCtrl.maintenance)

router.post('/:pid/fishing', isLoggedIn, usersCtrl.addFish)
router.post('/:pid/addFriend', isLoggedIn, usersCtrl.addFriend)
router.post('/:fid/addComment', isLoggedIn, usersCtrl.addComment)
router.post('/:id/sendMessage', isLoggedIn, usersCtrl.sendMessage)
router.post('/:id/sendMessageF', isLoggedIn, usersCtrl.sendMessageF)
router.post('/habits', isLoggedIn, isManager, usersCtrl.createHabit)

router.delete('/:id/u', isLoggedIn, usersCtrl.delete)
router.delete('/:id/h', isLoggedIn, isManager, usersCtrl.deleteHabit)
router.delete('/:id/deleteFriend', isLoggedIn, usersCtrl.deleteFriend)
router.delete('/:mid/deleteMessage', isLoggedIn, usersCtrl.deleteMessage)
router.delete('/:fid/:cid/deleteComment', isLoggedIn, usersCtrl.deleteComment)

router.put('/:id/updateUser', isLoggedIn, usersCtrl.updateUser)
router.put('/:id/updateH', isLoggedIn, isManager, usersCtrl.updateHabit)

export {
  router
}