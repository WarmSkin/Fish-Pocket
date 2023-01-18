import { Fish } from "../models/fish.js"

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
  
}

export {
  index,
  deleteFish as delete
}