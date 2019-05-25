const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())


let count = 0
app.post('/messages', (req, res) => {
  if (count < 5 && req.body.text){
    console.log(req.body.text)
    count += 1
  }else if (count >= 5 && req.body.text) {
    res.status(500).end()
  }else{
    res.status(400).end()
  }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))