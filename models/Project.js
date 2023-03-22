import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const ProjectSchema = new mongoose.Schema({
  projec_number: {
    type: Number,
  },
  
  project_name: {
    type: String,
    required: [true, 'Proszę podać nazwę dla tego projektu.'],
  },

  project_client: {
    type: String,
  },
  project_streets: {
    type: String,
  },
  project_filesNumber: {
    type: Number,
  },
  project_filesPath: {
    type: String,
  },
  project_filesNames: {
    type: [String],
  },
  project_start: {
    type: Date,
  },
  project_termin: {
    type: Date,
  },
  project_price: {
    type: Number,
  },
  project_price: {
    type: String,
  },
},{
  timestamps: true
} )

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema)
