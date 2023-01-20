import { Router } from 'express'
import * as speciesCtrl from '../controllers/species.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, speciesCtrl.index)
router.get('/:id/edit', isLoggedIn, speciesCtrl.edit)

router.post('/new', isLoggedIn, speciesCtrl.new)
router.post('/:id/:hid', isLoggedIn, speciesCtrl.addHabit)

router.delete('/:id', isLoggedIn, speciesCtrl.delete)
router.delete('/:id/:hid', isLoggedIn, speciesCtrl.deleteHabit)

router.put('/:id/', isLoggedIn, speciesCtrl.update)

export {
  router
}