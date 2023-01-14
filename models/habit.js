import mongoose from 'mongoose'

const Schema = mongoose.Schema

const HabitSchema = new Schema({
  name: String,
  content: String,
}, {
  timestamps: true
})

const Habit = mongoose.model('Habit', HabitSchema)

export {
  Habit
}