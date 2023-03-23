import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const ProjectSchema = new mongoose.Schema({
  project_number: {
    type: Number,
  },
  project_name: {
    type: String,
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
  project_files: {
    type: [Object],
  },
  project_start: {
    type: String,
  },
  project_termin: {
    type: String,
  },
  project_price: {
    type: Number,
  },
} )

ProjectSchema.pre('save', () => console.log('Hello from pre save'));

ProjectSchema.pre('deleteOne', function() { console.log('DELETING!'); });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema)
