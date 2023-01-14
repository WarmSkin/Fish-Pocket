import { Fish } from "../models/fish.js"

function index(req, res) {
    res.render('fish/index', { title: 'Fish Page' })
  }

export {
    index,
}