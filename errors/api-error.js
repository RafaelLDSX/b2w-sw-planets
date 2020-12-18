class ApiError extends Error {
    constructor(mensagem) {
        super(mensagem);
    }
}

module.exports = ApiError;