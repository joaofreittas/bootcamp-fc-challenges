const express = require('express')
const mysql = require('mysql')
const peopleService = require('./peopleService')

const app = express()
const port = 3000
const config = {
  host: 'db-mysql', // nome da imagem
  user: 'root',
  password: 'joao',
  database: 'nodedb'
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

app.get('/', (req, res) => {

  const names = ['Joao', 'Lucas', 'Maria', 'Pedro', 'Gabriele', 'Julia', 'Laura', 'Elisa', 'Débora', 'Carlos']
  const index = getRandomInt(0, names.length)

  peopleService.add(names[index], {mysql, config})
  const connection = mysql.createConnection(config)
  const sqlSelect = `SELECT * FROM people`
  
  connection.query(sqlSelect, (err, peoples) => {

    let message = `
    <h1>Full Cycle Rocks!</h1>
    - Lista de pessoas cadastradas no banco de dados.
    `

    if(peoples.length > 0) {
      message += `<ul>`

      peoples.forEach((p) => {
        message += `<li>${p.id} - ${p.name}</li>`
      })
  
      message += `</ul>`
    
    }else message += `<p>Não há pessoas cadastradas no banco</p>`

    res.send(message)
  })
})


app.listen(port,  () => {
  console.log('Rodando na porta ' + port)
})

