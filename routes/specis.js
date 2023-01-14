import { Router } from 'express'
import * as specisCtrl from '../controllers/specis.js'

const router = Router()

router.get('/', specisCtrl.index)
router.post('/new', specisCtrl.new)

export {
  router
}