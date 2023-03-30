import Note from "../../../models/Note"

export default async function handler (req,res) {

    switch (req.method) {
        case 'POST':
            console.log('ding', req.body)
            try {
                await Note.create({note_text: req.body})
    
            } catch (err) {
                console.log(err)
            }
            
            res.status(200).json({message: 'REACHED'})
        break
        case 'DELETE':
            try {
                await Note.findByIdAndDelete(req.body)
    
            } catch (err) {
                console.log(err)
            }
            res.status(200).json({message: 'REACHED'})
        break
        default:
        break;
    }
}