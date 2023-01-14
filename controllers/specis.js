import { Specis } from "../models/specis.js";

function index(req, res) {
    res.render('specis/index', { title: 'FishData Page' })
  }

export {
    index,
}