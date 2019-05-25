const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/messages', (req, res) => {
  if (!req.body.text){
    console.log(nee)
  }else{
    console.log(req.body.text)
  }
  
})

// app.post('/houses', function (req, res) {
//   House
//     .create(req.body)
//     .then(house => res.status(201).json(house))
// })
//req.body res.json(

app.listen(port, () => console.log(`App listening on port ${port}!`))