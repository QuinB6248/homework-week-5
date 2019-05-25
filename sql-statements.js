const { Pool } = require('pg')
const pool = new Pool({ connectionString: process.env.DATABASE_URL ||'postgresql://postgres:secret@localhost:5432/postgres' })
pool.on('error', (err, client) => {
    console.error('error event on pool', err)
})


pool.connect()
    .then(() => console.log("Connection to Postgres established!"))
    .then(() => pool.query('CREATE TABLE IF NOT EXISTS person (id serial, first_name varchar(255), last_name varchar(255), eye_color varchar(255))'))
    .then(() => pool.query('INSERT INTO person (first_name, last_name, eye_color) VALUES ($1, $2, $3)', ["James", "Smith", "brown eyes"]))
    .then(() => pool.query('INSERT INTO person (first_name, last_name, eye_color) VALUES ($1, $2, $3)', ["Frank", "Jones", "brown eyes"]))
    .then(() => pool.query('INSERT INTO person (first_name, last_name, eye_color) VALUES ($1, $2, $3)', ["Rebecca", "Andrews", "blue eyes"]))
    .then(() => pool.query(`UPDATE person SET eye_color='blue eyes' WHERE eye_color ILIKE 'brown%'`))
    .then(() => pool.query('SELECT * FROM "person" WHERE first_name= $1', ['James'] ))
    .then(res => {
      console.log(res.rows)
      return pool.end()
    })
    .catch(err => console.error("THIS IS THE ERROR", err))

