const ApiError = require('./api-error');

class NaoEncontrado extends ApiError {
    constructor(mensagem) {
        super(mensagem);
        this.statusCode = 404;
    }
}

module.exports = NaoEncontrado;