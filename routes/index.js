import { Router } from 'express'

const router = Router()

router.get('/', function (req, res) {
  res.render('index', { title: 'Home Page' })
})

// Profile.find(req.user.profile._id)
//   .populate('friends')
//   .populate('fishing')
//   .populate('comments')
//   .then(profile => {
//     res.render('index', { 
//       title: 'Home Page',
//       profile,
//     })
//   })
//   .catch(error => {
//     console.log(error)
//     res.render('index')
//   })

export {
  router
}
