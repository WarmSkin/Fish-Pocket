import { Router } from 'express'
import * as fishCtrl from '../controllers/fish.js'
import { addComment } from '../controllers/users.js'

const router = Router()

router.get('/', fishCtrl.index)
router.delete('/:id', fishCtrl.delete)
router.post('/:id/addComment', fishCtrl.addComment)

export {
  router
}