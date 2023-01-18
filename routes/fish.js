import { Router } from 'express'
import * as fishCtrl from '../controllers/fish.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, fishCtrl.index)
router.delete('/:id', fishCtrl.delete)
router.post('/:id/addComment', fishCtrl.addComment)
router.delete('/:fid/:cid/deleteComment', isLoggedIn, fishCtrl.deleteComment)

export {
  router
}