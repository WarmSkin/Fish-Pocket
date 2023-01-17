import { User } from "../models/user.js";
import { Habit } from "../models/habit.js";
import { Fish } from "../models/fish.js";
import { Specis } from "../models/specis.js";
import { Profile } from "../models/profile.js";
import { Comment } from "../models/comment.js";

function index(req, res) {
  User.find({_id: {$nin: req.user._id}})
  .populate('profile', 'name avatar mood fishing')
  .then(users => {
    Profile.find({})
    .populate('fishing')
    .then(profiles => {
      res.render("users/index", { 
        title: "All Users",
        myProfile: req.user.profile,
        users,
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

function deleteUser(req, res) {
  User.findByIdAndDelete(req.params.id)
  .then(user => {
    Profile.findByIdAndDelete(user.profile._id)
    .then(profile => {
        res.redirect('/')
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

function editUser(req, res) {
  Profile.findById(req.user.profile._id)
  .populate('friends')
  .populate('fishing')
  .populate('comments')
  .then(profile => {
    res.render('users/edit', { 
      title: "Update Your Information",
      profile,
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function updateUser(req, res) {
  User.findById(req.params.id)
  .then(user => {
    console.log(req.body)
    Profile.findByIdAndUpdate(user.profile._id, req.body)
    .then(profile => {
      res.redirect(`/users/${user._id}/edit`)
    })
    .catch(error => {
      console.log(error)
      res.redirect(`/users/${user._id}/edit`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/users/${user._id}/edit`)
  })
}

function maintenance(req, res) {
  Specis.find({})
  .populate('habits')
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

function addFriend(req, res) {
  req.user.profile.friends.push(req.params.pId)
  req.user.profile.save()
  res.redirect('/users')
}

function show(req, res) {
  Profile.findById(req.user.profile._id)
  .populate('friends')
  .populate('fishing')
  .populate('comments')
  .then(profile => {
    res.render('users/show', { 
      title: "User Page",
      profile,
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

export {
    index,
    deleteUser as delete,
    editUser,
    updateUser,
    maintenance,
    createHabit,
    deleteHabit,
    editHabit,
    updateHabit,
    addFriend,
    show,
}