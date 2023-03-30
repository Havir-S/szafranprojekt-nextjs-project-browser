import mongoose from 'mongoose'
import fs from 'fs'

const NoteSchema = new mongoose.Schema({
  note_text: {
    type: String
  },
})

export default mongoose.models.Note || mongoose.model('Note', NoteSchema)
