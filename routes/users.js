import { Router } from 'express'
import * as usersCtrl from '../controllers/users.js'

const router = Router()

router.get('/', usersCtrl.index)

export {
  router
}