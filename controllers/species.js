import { Species } from "../models/species.js";
import { Habit } from "../models/habit.js";
import { Fish } from "../models/fish.js";

function index(req, res) {
  Species.find({})
  .populate('habits')
  .then(species => {
    res.render('species/index', { 
      title: "Fish Data Page",
      species,
    })
  })
  .catch(error => {
    console.log(error),
    res.redirect('/')
  })
}

function newSpecies(req, res) {
  for (const key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }

  Species.create(req.body)
  .then(species => {
    res.redirect('/users/maintenance')
  })
  .catch(error => {
    console.log(error),
    res.redirect('/users/maintenance')
  })
}

function deleteSpecies(req, res) {
  Species.findByIdAndDelete(req.params.id)
  .then(species => {
    Fish.deleteMany(
      {_id: { $in: species.ownerFish}}
      )
    .then(fish => {
      res.redirect('/users/maintenance')
    })
    .catch(error => {
      console.log(error)
      res.redirect('/users/maintenance')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/users/maintenance')
  })
}

function edit(req, res) {
  Species.findById(req.params.id)
  .populate('habits')
  .then(fishData => {
    Habit.find({_id: {$nin: fishData.habits}})
    .then(habits => {
      res.render('species/edit', {
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

  Species.findByIdAndUpdate(req.params.id, req.body)
  .then(fishData => {
    res.redirect(`/species/${fishData._id}/edit`)
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/species/${fishData._id}/edit`)
  })
}

function addHabit(req, res) {
  Species.findById(req.params.id)
  .then(fishData => {
    fishData.habits.push(req.params.hid)
    fishData.save()
    .then(fishData => {
      res.redirect(`/species/${fishData._id}/edit`)
    })
    .catch(error => {
      console.log(error)
      res.redirect(`/species/${fishData._id}/edit`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/species/${fishData._id}/edit`)
  })
}

function deleteHabit(req, res) {
  Species.findById(req.params.id)
  .then(fishData => {
    fishData.habits.remove(req.params.hid)
    fishData.save()
    .then(fishData => {
      res.redirect(`/species/${fishData._id}/edit`)
    })
    .catch(error => {
      console.log(error)
      res.redirect(`/species/${fishData._id}/edit`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/species/${fishData._id}/edit`)
  })
}

export {
    index,
    newSpecies as new,
    deleteSpecies as delete,
    edit,
    update,
    addHabit,
    deleteHabit,
}