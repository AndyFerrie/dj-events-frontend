const { events } = require('./data.json')

export default (req, res) => {
const individualEvent = events.filter(event => event.slug === req.query.slug)

    if(req.method === 'GET') {
        res.status(200).json(individualEvent)
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).json({ message: `Method ${req.method} is not allowed` })
    }
}