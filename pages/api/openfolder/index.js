export default async function handler(req, res) {
    console.log(`Otwarto ${decodeURIComponent(req.body)}`)
    require('child_process').exec(`start "" "\"${decodeURIComponent(req.body)}\""`);

    res.status(200).json({message: 'OK'})
}