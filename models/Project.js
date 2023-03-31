import mongoose from 'mongoose'
import fs from 'fs'
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
  project_disk: {
    type: String,
  },
  project_filesNumber: {
    type: Number,
  },
  project_filesInfo: {
    type: [Object],
  },
  project_clientContact: {
    type: String
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
  project_status: {
    type: String,
  },
})

ProjectSchema.index({ project_name: 'text', project_client: 'text', project_clientContact: 'text', project_streets: 'text', project_start: 'text', project_termin: 'text', project_status: 'text' });

ProjectSchema.pre('save', async function (next) {
  const user = this;
  /////CREATE FOLDER FOR DOCUMENT FILES
  // try {
  //   if (!fs.existsSync(`${user.project_disk}:\\szafranprojekt\\${user.id}`)) {
  //     fs.mkdirSync(`${user.project_disk}:\\szafranprojekt\\${user.project_number}-${user.project_name}`, { recursive: true });
  //   }
  // } catch (err) {
  //   console.error(err);
  // }
  console.log('Zapisano projekt.', `${user.project_disk}:\\szafranprojekt\\${user.project_number}-${user.project_name}`)
  next();
});

ProjectSchema.virtual('filePath').get(function () {
  return`${this.project_disk}:\\szafranprojekt\\${this.project_number}-${this.project_name}`
})

// ProjectSchema.pre('deleteOne', async function(next) {
//   /////delete folder on delete schema

//   //////////// DOESN'T WORK FROM HERE, SWITCHING TO DELETING ON REACHING THE APP
//   // try {
//   //   fs.rmSync(`${this.project_disk}:\\szafranprojekt\\${this.id}`, { recursive: true, force: true });
//   //   // fs.rm(`${user.project_disk}:\\szafranprojekt\\${user.id}`, { recursive: true }, (err => {
//   //   //   if (err) {
//   //   //     console.log(err)
//   //   //     throw err;
//   //   //   }
//   //   // }));
//   // } catch (err) {
//   //   console.log(err)
//   // }
//   next();
//  });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema)
