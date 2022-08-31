const products = require('../data/products.json')
const {
    v4: uuidV4
} = require('uuid')

const {
    writeDataToFile
} = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((product) => product.id === parseInt(id))

        resolve(product)
    })
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {
            id: uuidV4(),
            ...product
        }
        products.push(newProduct)
        writeDataToFile('./data/products.json', products)
        resolve(newProduct)
    })
}

module.exports = {
    findAll,
    findById,
    create
}