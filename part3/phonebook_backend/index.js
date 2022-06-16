const express = require('express')
var morgan = require('morgan')
morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})
const app = express()

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const person = persons.find(person => {
    //console.log(note.id, typeof note.id, id, typeof id, note.id === id)
    return person.id === id
  })
  console.log(person)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

//DELETE
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

//POST
const generateId = () => {
    return Math.floor(Math.random()*1000+1)
  }
  
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'content missing!' 
        })
    }

    const duplicateArr = persons.filter(person => person.name === body.name)

    if (duplicateArr.length > 0){
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

//GET INFO
app.get('/info', (request, response) => {
    
    const info = `Phonebook has info for ${persons.length} people`+'\n' + `${new Date()}`
    console.log(info)
    
    response.send(info)
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})