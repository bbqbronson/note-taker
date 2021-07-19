const fs = require('fs')
let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))

module.exports = function (app) {
  app.get('/api/notes', function (req, res) {
    res.json(data)
  })

  app.get('/api/notes/:id', function (req, res) {
    res.json(data[Number(req.params.id)])
  })

  app.post('/api/notes', function (req, res) {
    const newNote = req.body
    const uniqueId = (data.length).toString()
    newNote.id = uniqueId
    data.push(newNote)

    fs.writeFileSync('./db/db.json', JSON.stringify(data), function (err) {
      if (err) throw (err)
    })

    res.json(data)
  })

  app.delete('/api/notes/:id', function (req, res) {
    const noteId = req.params.id
    let newId = 0
    let counter = 0
    data = data.filter(counter => {
      return counter.id !== noteId
    })
    for (counter of data) {
      counter.id = newId.toString()
      newId++
    }
    fs.writeFileSync('./db/db.json', JSON.stringify(data))
    res.json(data)
  })
}
