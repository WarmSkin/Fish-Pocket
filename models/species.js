import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SpeciesSchema = new Schema({
  name: String,
  content: String,
  avatar: String,
  keeperLength: String,
  seasonStartDate: Date,
  seasonEndDate: Date,
  habits: [{type: Schema.Types.ObjectId, ref: "Habit"}]
}, {
  timestamps: true
})
const Species = mongoose.model('Species', SpeciesSchema)

export {
  Species
}