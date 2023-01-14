import { Specis } from "../models/specis.js";

function index(req, res) {
  Specis.find({})
    .then(specis => {
      res.render('specis/index', { 
        title: "FishData Page",
        specis,
      })

    })
}

function newSpecis(req, res) {
  Specis.create(req.body)
  .then(specis => {
    res.redirect('/specis')
  })
  .catch(error => {
    console.log(error),
    res.redirect('/specis')
  })
}

export {
    index,
    newSpecis as new,
}