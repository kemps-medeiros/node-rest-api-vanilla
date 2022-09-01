const Product = require('../models/productModel');

const {
    getPostData
} = require('../utils')

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

        const body = await getPostData(req)

        const {
            description,
            value
        } = JSON.parse(body)

        const product = {
            description,
            value
        }

        const newProduct = await Product.create(product)
        res.writeHead(201, {
            'Content-Type': 'application/json'
        });
        return res.end(JSON.stringify(newProduct))

    } catch (error) {
        console.log(error)
    }
}

async function updateProduct(req, res, id) {
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
            const body = await getPostData(req)

            const {
                description,
                value
            } = JSON.parse(body)

            const product = {
                description: description || productFound.description,
                value: value || productFound.value
            }

            const updatedProduct = await Product.update(id, product)

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            return res.end(JSON.stringify(updatedProduct))
        }



    } catch (error) {
        console.log(error)
    }
}

async function removeProduct(req, res, id) {
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
            await Product.remove(id)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({
                message: `Product ${id} removed`
            }))
        }

    } catch (error) {

    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct
}