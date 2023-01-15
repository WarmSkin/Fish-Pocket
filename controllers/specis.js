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
  for (const key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }

  Specis.create(req.body)
  .then(specis => {
    res.redirect('/specis')
  })
  .catch(error => {
    console.log(error),
    res.redirect('/specis')
  })
}

function deleteSpecis(req, res) {
  Specis.findByIdAndDelete(req.params.id)
  .then(specis => {
    res.redirect('/specis')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/specis')
  })
}

function edit(req, res) {
  Specis.findById(req.params.id)
  .then(fishData => {
    res.render('specis/edit', {
      title: "Fish Data",
      fishData,
    })
  })
}

function update(req, res) {
  for (const key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }

  Specis.findByIdAndUpdate(req.params.id, req.body)
  .then(fishData => {
    res.redirect(`/specis/${fishData._id}/edit`)
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/specis/${fishData._id}/edit`)
  })
}

export {
    index,
    newSpecis as new,
    deleteSpecis as delete,
    edit,
    update,
}