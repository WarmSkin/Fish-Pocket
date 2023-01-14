import { User } from "../models/user.js";

function index(req, res) {
    res.render('users/index', { title: 'Users Page' })
  }

export {
    index,
}