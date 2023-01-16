import { Router } from 'express'
import * as specisCtrl from '../controllers/specis.js'

const router = Router()

router.get('/', specisCtrl.index)
router.get('/:id/edit', specisCtrl.edit)
router.post('/new', specisCtrl.new)
router.post('/:id/:hid', specisCtrl.addHabit)
router.delete('/:id/:hid', specisCtrl.deleteHabit)
router.delete('/:id', specisCtrl.delete)
router.put('/:id/', specisCtrl.update)

export {
  router
}