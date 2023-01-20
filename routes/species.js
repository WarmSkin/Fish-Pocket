import { Router } from 'express'
import * as speciesCtrl from '../controllers/species.js'

const router = Router()

router.get('/', speciesCtrl.index)
router.get('/:id/edit', speciesCtrl.edit)

router.post('/new', speciesCtrl.new)
router.post('/:id/:hid', speciesCtrl.addHabit)

router.delete('/:id', speciesCtrl.delete)
router.delete('/:id/:hid', speciesCtrl.deleteHabit)

router.put('/:id/', speciesCtrl.update)

export {
  router
}