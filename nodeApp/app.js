const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const path = require('path')
const axios = require('axios')

const app = express()
const port = 5000

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM products'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'fullstack'
})

connection.connect(err => {
    if (err) {
        return err
    }
})
app.use(cors())

app.get('/', (req, res) => {
    res.send('go to /products to see the products')
})

app.get('/products/add', (req, res) => {
    const { name, price } = req.query
    console.log(name, price)

    const INSERT_PRODUCT_QUERY = `INSERT INTO products (name, price) VALUES ('${name}', '${price}')`

    connection.query(INSERT_PRODUCT_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.send('Successfully added product!')
        }
    })
})


app.delete('/products/:id', (req, res) => {

    connection.query('DELETE FROM products WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Product deleted successfully.');
        else
            console.log(err);
    })
});

app.get('/products', (req, res) => {
    connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })

})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})