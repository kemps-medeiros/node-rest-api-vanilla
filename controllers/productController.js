const Product = require('../models/productModel');

async function getProducts(req, res) {
    try {

        const products = await Product.findAll()

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(products))

    } catch (error) {
        console.log(error)
    }
}

async function getProduct(req, res, id) {
    try {

        const productFound = await Product.findById(id)

        if (!productFound) {

            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                message: "Product Not Found"
            }))

        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(productFound))
        }



    } catch (error) {
        console.log(error)
    }
}

async function createProduct(req, res) {
    try {
        const product = {
            description: 'sofa',
            value: 45.8
        }

        const newProduct = Product.create(product)
        res.writeHead(201, {
            'Content-Type': 'application/json'
        });
        return res.end(JSON.stringify(newProduct))


    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct
}