import { Fish } from "../models/fish.js"
import { Profile } from "../models/profile.js"
import { Comment } from "../models/comment.js"

function index(req, res) {
  Fish.find({})
  .populate('species')
  .populate('owner')
  .populate('comments')
  .then(fish => {
    Profile.findById(req.user.profile._id)
    .then(myProfile => {
      res.render('fish/index', { 
        title: 'Fish Caught',
        fish,
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

function deleteFish(req, res) {
  Fish.findByIdAndDelete(req.params.id)
  .then(fish => {
    Profile.findOneAndUpdate(
      {_id: fish.owner._id},
      {$pull: { fishing: fish._id}}
      )
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
}

function addComment(req, res) {
  Fish.findById(req.params.id)
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
        res.redirect('/fish')
      })
      .catch(error => {
        console.log(error)
        res.redirect('/fish')
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/fish')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/fish')
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
          res.redirect('/fish')
        })
        .catch(error => {
          console.log(error)
          res.redirect('/fish')
        })
      })
      .catch(error => {
        console.log(error)
        res.redirect('/fish')
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/fish')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/fish')
  })
}

export {
  index,
  deleteFish as delete,
  addComment,
  deleteComment,
}