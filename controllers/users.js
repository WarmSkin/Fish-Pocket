import { User } from "../models/user.js";
import { Habit } from "../models/habit.js";
import { Fish } from "../models/fish.js";
import { Species } from "../models/species.js";
import { Profile } from "../models/profile.js";
import { Comment } from "../models/comment.js";

function index(req, res) {
  User.find({_id: {$nin: req.user._id}})
  .populate({
    path: 'profile',
    populate: {path: 'fishing'}, 
  })
  .then(users => {
    Profile.findById(req.user.profile._id)
    .then(myProfile => {
      res.render("users/index", { 
        title: "All Users",
        myProfile,
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
  Species.find({})
  .populate('habits')
  .then(species => {
    Habit.find({})
    .then(habits => {
      res.render("users/maintenance", { 
        title: "Maintenance",
        species,
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
    Species.find({})
    .then(species => {
      species.forEach(fishData => {
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
  Profile.findById(req.user.profile.id)
  .then(profile => {
    profile.friends.push(req.params.pid)
    profile.save()
    res.redirect('/users')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/users')
  })
}

function show(req, res) {
  const newFish = new Fish();
  const caughtDate = newFish.caughtDate;

  Profile.findById(req.user.profile._id)
  .populate('friends')
  .populate('fishing')
  .populate('comments')
  .then(profile => {
    Species.find({})
    .then(species => {
      res.render('users/show', { 
        title: "User Page",
        caughtDate: caughtDate.toISOString().slice(0, 10),
        profile,
        species,
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

function addFish(req, res) {
  Profile.findById(req.params.pid)
  .then(profile => {
    req.body.owner = req.params.pid
    req.body.ownerName = profile.name
    Fish.create(req.body)
    .then(fish => {
      Species.findById(fish.species._id)
      .then(species => {
        fish.name = species.name
        fish.save()
        profile.fishing.push(fish._id)
        profile.save()
        .then(profile => {
          res.redirect('/users/mypage')
        })
        .catch(error => {
          console.log(error)
          res.redirect('/users/mypage')
        })
      })
      .catch(error => {
        console.log(error)
        res.redirect('/users/mypage')
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/users/mypage')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/users/mypage')
  })
}

function sendMessage(req, res) {
  Profile.findById(req.params.id)
  .then(profile1 => {
    Profile.findById(req.user.profile._id)
    .then(profile2 => {
      req.body.from = profile2.name
      req.body.sender = profile2._id
      req.body.to = profile1.name
      req.body.receiver = profile1._id
      Comment.create(req.body)
      .then(comment => {
        profile1.comments.push(comment._id)
        profile1.save()
        profile2.comments.push(comment._id)
        profile2.save()
        res.redirect('/users')
      })
      .catch(error => {
        console.log(error)
        res.redirect('/users')
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/users')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/users')
  })
}

function sendMessageF(req, res) {
  Profile.findById(req.params.id)
  .then(profile1 => {
    Profile.findById(req.user.profile._id)
    .then(profile2 => {
      req.body.from = profile2.name
      req.body.sender = profile2._id
      req.body.to = profile1.name
      req.body.receiver = profile1._id
      Comment.create(req.body)
      .then(comment => {
        profile1.comments.push(comment._id)
        profile1.save()
        profile2.comments.push(comment._id)
        profile2.save()
        res.redirect(`/users/${profile1._id}/friend`)
      })
      .catch(error => {
        console.log(error)
        res.redirect(`/users/${profile1._id}/friend`)
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect(`/users/${profile1._id}/friend`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/users/${friend._id}/friend`)
  })
}

function deleteFriend(req, res) {
  Profile.findOneAndUpdate(
    {_id: req.user.profile._id},
    {$pull: { friends: req.params.id}}
    )
  .then(profile => {
    res.redirect(`/users/${req.user._id}/edit`)
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/users/${req.user._id}/edit`)
  })
}

function showFriend(req, res) {
  Profile.findById(req.params.fid)
  .populate('fishing')
  .then(friend => {
    Profile.findById(req.user.profile._id)
    .populate('comments')
    .then(myProfile => {
      console.log("!!!!!",myProfile)
      res.render('users/myFriend', {
        title: `${friend.name}`,
        myProfile,
        friend,
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/users/mypage')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/users/mypage')
  })
}

function showFish(req, res) {
  Fish.findById(req.params.fid)
  .populate('species')
  .populate('comments')
  .then(fishData => {
    Profile.findById(req.user.profile._id)
    .then(myProfile => {
      res.render('users/showFish', { 
        title: 'Fish Caught',
        fishData,
        myProfile,
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


function deleteMessage(req, res) {
  Profile.findByIdAndUpdate(
    {_id: req.user.profile._id},
    {$pull: { comments: req.params.mid}}
  )
  .then(profile => {
    res.redirect(`/users/${req.user._id}/edit`)
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/users/${req.user._id}/edit`)
  })
}

function deleteComment(req, res) {
  Fish.findByIdAndUpdate(
    {_id: req.params.fid},
    {$pull: { comments: req.params.cid}}
  )
  .then( fishData => {
    Comment.findByIdAndDelete(req.params.cid)
    .then(comment => {
      Profile.findByIdAndUpdate(
        {_id: comment.sender._id},
        {$pull: { comments: comment._id}}
      )
      .then(profileS => {
        Profile.findByIdAndUpdate(
          {_id: comment.receiver._id},
          {$pull: { comments: comment._id}}
        )
        .then(profileR => {
          res.redirect(`/users/${req.params.fid}/afish`)
        })
        .catch(error => {
          console.log(error)
          res.redirect(`/users/${req.params.fid}/afish`)
        })
      })
      .catch(error => {
        console.log(error)
        res.redirect(`/users/${req.params.fid}/afish`)
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect(`/users/${req.params.fid}/afish`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/users/${req.params.fid}/afish`)
  })
}

function addComment(req, res) {
  Fish.findById(req.params.fid)
  .populate('owner')
  .then(fishData => {
    Profile.findById(req.user.profile._id)
    .then(profile => {
      req.body.from = profile.name
      req.body.sender = profile._id
      req.body.to = `${fishData.owner.name}'s ${fishData.name}`
      req.body.receiver = fishData._id
      Comment.create(req.body)
      .then(comment => {
        fishData.owner.comments.push(comment._id)
        fishData.owner.save()
        fishData.comments.push(comment._id)
        fishData.save()
        profile.comments.push(comment._id)
        profile.save()
        res.redirect(`/users/${req.params.fid}/afish`)
      })
      .catch(error => {
        console.log(error)
        res.redirect(`/users/${req.params.fid}/afish`)
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect(`/users/${req.params.fid}/afish`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/users/${req.params.fid}/afish`)
  })
}

export {
    show,
    index,
    editUser,
    editHabit,
    addFish,
    addFriend,
    addComment,
    createHabit,
    updateUser,
    updateHabit,
    showFish,
    showFriend,
    sendMessage,
    sendMessageF,
    deleteHabit,
    deleteFriend,
    deleteMessage,
    deleteComment,
    deleteUser as delete,
    maintenance,
}