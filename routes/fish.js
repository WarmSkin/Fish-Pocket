import { Router } from 'express'
import * as fishCtrl from '../controllers/fish.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, fishCtrl.index)

router.post('/:id/addComment', isLoggedIn, fishCtrl.addComment)

router.delete('/:id', isLoggedIn, fishCtrl.delete)
router.delete('/:fid/:cid/deleteComment', isLoggedIn, fishCtrl.deleteComment)

export {
  router
}