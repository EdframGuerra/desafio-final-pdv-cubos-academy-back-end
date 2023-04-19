const validateRequisitionBody = validationsSchema => async (req, res, next) => {

    try {

        await validationsSchema.validateAsync(req.body)

        next()

    } catch (error) {
        return res.status(422).json({ mensagem: error.message })
    }
}

module.exports = {
    validateRequisitionBody
}