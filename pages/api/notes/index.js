import nc from 'next-connect'
import notes from '../../../src/data/notes'

function between(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

const handler = nc()
  .get((req, res) => {
    res.json({ data: notes })
  })
  .post((req, res) => {
    const id = Date.now()
    const note = { ...req.body, id: id + between(1000, 200000) }

    notes.push(note)
    res.json({ data: note })
  })
export default handler