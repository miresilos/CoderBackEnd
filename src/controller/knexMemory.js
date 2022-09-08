const insert = (knex, table, data) => {
    knex(table)
    .insert(data)
    .then(() => {
        console.log("Data successfully inserted");
    })
    .catch(err => console.log(err))
}

export default insert;