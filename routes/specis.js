import { Router } from 'express'
import * as specisCtrl from '../controllers/specis.js'

const router = Router()

router.get('/', specisCtrl.index)
router.post('/new', specisCtrl.new)
router.delete('/:id', specisCtrl.delete)

export {
  router
}