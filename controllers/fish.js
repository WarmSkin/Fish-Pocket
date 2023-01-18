import { Fish } from "../models/fish.js"
import { Profile } from "../models/profile.js"

function index(req, res) {
  Fish.find({})
  .populate('species')
  .populate('owner')
  .then(fish => {
    res.render('fish/index', { 
      title: 'Fish Caught',
      fish,
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function deleteFish(req, res) {
  Fish.findByIdAndDelete(req.params.id)
  .then(fish => {
    console.log("delete fish here~~~~!!!!", fish)
    Profile.find(fish.owner._id)
    .then(profile => {
      console.log("Owner here!!!!!", profile)
      profile.fishing.remove({_id: fish._id})
      profile.save()
      .then(profile => {
        res.redirect(`/users/${fish.owner._id}/edit`)
      })
      .catch(error => {
        console.log(error)
        res.redirect(`/users/${fish.owner._id}/edit`)
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect(`/users/${fish.owner._id}/edit`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/users/${fish.owner._id}/edit`)
  })
}

export {
  index,
  deleteFish as delete
}