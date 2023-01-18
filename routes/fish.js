import { Router } from 'express'
import * as fishCtrl from '../controllers/fish.js'

const router = Router()

router.get('/', fishCtrl.index)
router.delete('/:id', fishCtrl.delete)

export {
  router
}