import { Specis } from "../models/specis.js";
import { Habit } from "../models/habit.js";

function index(req, res) {
  Specis.find({})
  .populate('habits')
  .then(specis => {
    res.render('specis/index', { 
      title: "FishData Page",
      specis,
    })
  })
  .catch(error => {
    console.log(error),
    res.redirect('/')
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
  .populate('habits')
  .then(fishData => {
    Habit.find({_id: {$nin: fishData.habits}})
    .then(habits => {
      res.render('specis/edit', {
        title: "Fish Data",
        fishData,
        habits,
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
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

function addHabit(req, res) {
  Specis.findById(req.params.id)
  .then(fishData => {
    fishData.habits.push(req.params.hid)
    fishData.save()
    .then(fishData => {
      res.redirect(`/specis/${fishData._id}/edit`)
    })
    .catch(error => {
      console.log(error)
      res.redirect(`/specis/${fishData._id}/edit`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/specis/${fishData._id}/edit`)
  })
}

function deleteHabit(req, res) {
  Specis.findById(req.params.id)
  .then(fishData => {
    fishData.habits.remove(req.params.hid)
    fishData.save()
    .then(fishData => {
      res.redirect(`/specis/${fishData._id}/edit`)
    })
    .catch(error => {
      console.log(error)
      res.redirect(`/specis/${fishData._id}/edit`)
    })
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
    addHabit,
    deleteHabit,
}