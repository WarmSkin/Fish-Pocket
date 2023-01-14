import { Specis } from "../models/specis.js";

function index(req, res) {
  Specis.find({})
    .then(specis => {
      res.render('specis/index', { 
        title: 'FishData Page',
        specis,
      })

    })
  }

export {
    index,
}