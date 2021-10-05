const fs = require('fs');

class Contenedor {
    constructor(file) {
        this.file = file;
    }

    async getAll() {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8');
            const listaDeProductos = JSON.parse(content);
            return listaDeProductos;
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async getById(id) {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8')
            const listaDeProductos = JSON.parse(content);
            const product = listaDeProductos.find(e => e.id === id);

            if (!product) {
                return { error: 'Producto no encontrado' };
            }

            return product;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async save(product) {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8')

            let products = [];

            if (content === "") {
                product.id = 1;
                products.push(product);
            } else {
                const listaDeProductos = JSON.parse(content);

                product.id = listaDeProductos.length + 1;
                listaDeProductos.push(product);
                products = listaDeProductos;
            }
            const productoString = JSON.stringify(products, null, 2);
            await fs.promises.writeFile(`${this.file}`, productoString);
            return product;
        } catch (error) {
            console.error('Error: ', error);
        }

    }

    async update(id, producto) {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8')
            const listaDeProductos = JSON.parse(content);
            const product = listaDeProductos.find(e => e.id === id);
            const indexOfProduct = listaDeProductos.findIndex(e => e.id === id);

            if (!product) {
                return { error: 'Producto no encontrado' };
            };

            const productUpdated = {
                ...product,
                ...producto
            }

            listaDeProductos[indexOfProduct] = productUpdated;

            const productoString = JSON.stringify(listaDeProductos, null, 2);
            await fs.promises.writeFile(`${this.file}`, productoString);

            return productUpdated;
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async deleteById(id) {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8');
            const listaDeProductos = JSON.parse(content);
            const product = listaDeProductos.find(e => e.id === id);
            const positionProd = listaDeProductos.findIndex(e => e.id === id);

            if (!product) {
                return { error: 'Producto no encontrado' };
            };

            listaDeProductos[positionProd] = ' ';
            const productString = JSON.stringify(listaDeProductos, null, 2);

            await fs.promises.writeFile(`${this.file}`, productString);
            return listaDeProductos;

        } catch (error) {
            console.error('Error: ', error);
        }
    }
}

module.exports = Contenedor;