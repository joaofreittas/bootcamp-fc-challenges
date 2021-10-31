const add = async (name, props) => {

  const { mysql, config } = props
  const connection = mysql.createConnection(config)

  const sql = `INSERT INTO people(name) values('${name}');`
  await connection.query(sql)

  connection.end()

}

module.exports = {
  add
}