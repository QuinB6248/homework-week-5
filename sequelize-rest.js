const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres', {define: { timestamps: false }})
const port = process.env.PORT || 4000
const app = express()
app.use(bodyParser.json())

// MOVIE MODEL
const Movie = sequelize.define('movies', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  yearOfRelease: {
    type: Sequelize.INTEGER,
    field: 'year_of_release',
    allowNull: false
  },
  synopsis: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'movies'
})

Movie.sync() 

// CREATE A NEW MOVIE RESOURCE
app.post('/movies', function (req, res, next) {
  Movie
    .create(req.body)
    .then(movie => res.status(201).json(movie))
    .catch(error => next(error))
})

// READ A SINGLE MOVIE RESOURCE
app.get('/movies/:id', function (req, res, next) {
  Movie
    .findByPk(req.params.id)
    .then(movie => {
      if(!movie) {
        return res.status(404).json({
          message: `Movie does not exist`
        })
      }
      return res.json(movie)
    })
    .catch(error => next(error))
})

// UPDATE A SINGLE MOVIE RESOURCE
app.put('/movies/:id', (req, res, next) => {
  Movie
    .findByPk(req.params.id)
    .then(movie => {
      if (!movie) {
        return res.status(404).json({
          message: `Movie does not exist`
        })
      }
      return movie.update(req.body).then(movie => res.json(movie))
    })
    .catch(error => next(error))
})

// DELETE A SINGLE MOVIE RESOURCE
app.delete('/movies/:id', (req, res, next) => {
  Movie
    .findByPk(req.params.id)
    .then(movie => {
      if (!movie) {
        return res.status(404).json({
          message: `Movie does not exist`
        })
      }
      return movie.destroy()
        .then(() => res.json({
          message: `Movie was deleted`
        }))
    })
    .catch(error => next(error))
})

// READ ALL MOVIES - ENTIRE COLLECTION RESOURCE
app.get('/movies', (req, res, next) => {
  const limit = req.query.limit || 25
  const offset = req.query.offset || 0
    
  Promise.all([
    Movie.count(),
    Movie.findAll({ limit, offset })
  ])
    .then(([total, movies]) => {
      res.json({
        movies, total
      })
    })
    .catch(error => next(error))
  })



app.listen(port, () => console.log(`Listening on port ${port}`))