const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');
const { productRepository } = require('../repositories/ProductRepository');
const { categoryRepository } = require('../repositories/CategoryRepository');
const { error } = require('../schema/productSchema');

const createProduct = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    const product = await productRepository.create({ descricao, quantidade_estoque, valor, categoria_id })

    if (!product) throw new InternalServerError('Não foi possível criar o produto')

    return res.status(201).json(product)
}

const updateProduct = async (req, res) => {

    const product = await productRepository.update(req.body, { id: req.params.id })
    if (!product) throw new InternalServerError('Não foi possível atualizar o produto')

    return res.status(204).send()
}

const getProduct = async (req, res) => {
    const { categoria_id } = req.query;


    if (categoria_id) {
        const category = await categoryRepository.findOne(categoria_id)

        if (!category) throw new NotFoundError('Categoria não encontrada')

        const productCategory = await productRepository.findAll({ categoria_id })

        if (!productCategory) throw new NotFoundError('Não há produtos para essa categoria')

        return res.json(productCategory)
    }

    const product = await productRepository.findAll()

    return res.json(product)

}

const getOneProduct = async (req, res) => {
    const { id } = req.params

    const product = await productRepository.findOne({ id })

    if (!product) throw new NotFoundError('Produto não encontrado')

    return res.json(product)
}

const deleteProduct = async (req, res) => {
    const { id } = req.params

    const product = await productRepository.delete({ id })


    if (!product) throw new NotFoundError('Produto não encontrado')

    return res.status(204).send()
}

module.exports = {
    createProduct,
    updateProduct,
    getProduct,
    getOneProduct,
    deleteProduct
}
