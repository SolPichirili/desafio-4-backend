const express = require('express');
const Contenedor = require('../Contenedor');

const routerProducts = express.Router();

const productsContenedor = new Contenedor('./data/products.json');

routerProducts.get('/', async (req, res) => {
    const productList = await productsContenedor.getAll();
    res.json({ productos: productList });
});

routerProducts.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const productById = await productsContenedor.getById(id);
    res.json({ producto: productById });
});

routerProducts.post('/', async (req, res) => {
    const newProduct = req.body;
    const newList = await productsContenedor.save(newProduct);
    res.json({ productos: newList });
});

routerProducts.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const product = req.body;
    const newList = await productsContenedor.update(id, product);
    res.json({ actualizado: newList });
});

routerProducts.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const newList = await productsContenedor.deleteById(id);
    res.json({ actualizado: newList });
});

module.exports = routerProducts;