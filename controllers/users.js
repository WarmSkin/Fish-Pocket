import { User } from "../models/user.js";
import { Habit } from "../models/habit.js";
import { Fish } from "../models/fish.js";
import { Specis } from "../models/specis.js";

function index(req, res) {
  res.render("users/index", { title: "Users Page" })
}

function maintenance(req, res) {
  Specis.find({})
  .then(specis => {
    Habit.find({})
    .then(habits => {
      res.render("users/maintenance", { 
        title: "Maintenance",
        specis,
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

function createHabit(req, res) {
  Habit.create(req.body)
  .then(habit => {
    res.redirect('/users/maintenance')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/users/maintenance')
  })
}

function deleteHabit(req, res) {
  Habit.findByIdAndDelete(req.params.id)
  .then(habit => {
    Specis.find({})
    .then(specis => {
      specis.forEach(fishData => {
        if(fishData.habits)
          fishData.habits.remove({_id: req.params.id})
      })
    })
    res.redirect('/users/maintenance')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/users/maintenance')
  })
}

function editHabit(req, res) {
  Habit.findById(req.params.id)
  .then(habit => {
    res.render('habit/update', {
      title: "Habit Detail",
      habit,
    })
  })
}

function updateHabit(req, res) {
  Habit.findByIdAndUpdate(req.params.id, req.body)
  .then(habit => {
    res.redirect(`/users/${habit._id}/editH`)
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/users/${habit._id}/editH`)
  })
}

export {
    index,
    maintenance,
    createHabit,
    deleteHabit,
    editHabit,
    updateHabit,
}