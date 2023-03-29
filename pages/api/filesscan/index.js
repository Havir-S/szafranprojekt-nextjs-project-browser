import fs from 'fs'


export default async function handler(req, res) {
    console.log('ding')
    console.log(req.body)

    fs.readdir(req.body, (err, files) => {
        if (err)
          console.log(err);
        else {
          console.log("\nCurrent directory filenames:");
          files.forEach(file => {
            console.log(file);
          })
        }
      }, {})

    res.status(200).json({message: 'OK'})
}