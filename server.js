const express = require('express')
// Handlebars JS (hbs)
const hbs = require('hbs')
// Set by Heroku or default to 3000
const port = process.env.PORT || 3000

var app = express()

hbs.registerPartials(__dirname + '/views/partials')

// Tell Express to use hbs as the view engine
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

app.use((req, res, next)=> {
  var now = new Date().toString()

  console.log(`${now}: ${req.method} ${req.url}`)
  next()
})

hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear()
})

hbs.registerHelper('allCaps', (text)=> {
    return text.toUpperCase()
})

var person = {
  firstName: 'John',
  lastName: 'Johnson',
  favoriteColor: 'Blue',
  toys: ['Ping Pong Table','Pool Table','Pinball Maching','Foosball Table']
}
app.get('/',(req, res) => {
  //response.send(person)
  res.render('index.hbs', {
    pageTitle: 'Home page',
    person})
})

app.get('/about',(req,res) => {
    res.render('about.hbs',{
      pageTitle: 'About Page',
      person
    })
})

app.get('/bad', (req,res) => {
  res.send({
    response: 'Bad',
    error: 'Not good'
  })
})
app.listen(port, () => {
  console.log('Server is running on port: ' + port)
})
