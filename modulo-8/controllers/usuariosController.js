const Usuarios = require('../models/usuariosModel');
const { criarUsuarioSchema, atualizarUsuarioSchema } = require('../validators/usuarioSchema');

function validar(schema, body) {
    const { error, value } = schema.validate(body, { abortEarly: true, stripUnknown: true });

    if(error) {
        const msg = error.details?.[0]?.message || 'Dados inválidos';
        const err = new Error(msg);
        err.status = 400;
        throw err;
    }

    return value;
}

exports.create = async (req, res, next) => {
    try {
        const dados = validar(criarUsuarioSchema, req.body);
        const user = await Usuarios.criar(dados);
        return res.status(201).json({ ...user, message: 'Usuário criado com sucesso!' });
    } catch (err) {
        return next(err);
    }
};

exports.read = async (req, res, next) => {
    try {
        const { page, limit, nome } = req.query;
        const data = await Usuarios.listar({ page, limit, nome });
        return res.json(data);
    } catch (err) {
        return next(err);
    }
};

exports.readById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const user = await Usuarios.buscarPorId(id);

        if(!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        return res.json(user);
    } catch (err) {
        return next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const dados = validar(atualizarUsuarioSchema, req.body);

        const affected = await Usuarios.atualizar(id, dados);
        if(!affected) return res.status(404).json({ error: 'Usuário não encontrado' });

        return res.json({ message: 'Usuário atualizado com sucesso' });
    } catch (err) {
        return next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const affected = await Usuarios.remover(id);
        
        if(!affected) return res.status(404).json({ error: 'Usuário não encontrado' });

        return res.json({ message: 'Usuário excluído com sucesso' });
    } catch (err) {
        return next(err);
    }
};