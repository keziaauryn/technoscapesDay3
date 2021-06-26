// import library
const express = require('express');
const bodyParser = require('body-parser');
const { request } = require('http');

const ProductRepository = require('./productRepository');

// inisialisasi app 
const app = express();
app.use(bodyParser.json());

// REQUEST => client minta data
// RESPONSE => server balikin data

app.get('/', (req, res) => {
    const data = { message: 'API TOKOPAEDI' };
    return res.json(data);
});

// find all
app.get('/products', async (req, res) => {
    const allProducts = await ProductRepository.findAll();
    return res.json(allProducts);
});

// find by id
app.get('/products/:id', async (req, res) => {
    const productDetail = await ProductRepository.findOne(req.params.id);
    return res.json(productDetail);
});

// insert
app.post('/products', async (req, res) => {
    await ProductRepository.insert(req.body);
    res.json({ message: 'Insert Success'});
});

// update
app.put('/products/:id', async (req, res) => {
    await ProductRepository.update(req.params.id, req.body);
    return res.json({ message: 'Update Success'});
});

// delete
app.delete('/products/:id', async (req, res) => {
    await ProductRepository.delete(req.params.id);
    return res.json({ message: 'Delete Success'});
});

// inisialisasi port
app.listen('3000', () => {
    console.log('App listening at https://localhost:3000')
})