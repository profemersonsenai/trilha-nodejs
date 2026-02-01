const pool = require('../config/db');

async function criar({ nome, email, senha }) {
    const [result] = await pool.execute(
        'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, senha]
    );

    return { id: result.insertId, nome, email };
}

async function listar({ page = 1, limit = 10, nome }) {
    const p = Math.max(parseInt(page, 10) || 1, 1);
    const l = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);
    const offset = (p - 1) * l;

    const where = nome ? 'WHERE nome LIKE ?' : '';
    const params = [];

    if(nome) params.push(`%${nome}%`);
    params.push(l, offset);

    const [rows] = await pool.execute(
        `SELECT id, nome, email FROM usuarios ${where} ORDER BY id DESC LIMIT ? OFFSET ?`,
        params
    );

    return { page: p, limit: l, results: rows };
}

async function buscarPorId(id) {
    const [rows] = await pool.execute('SELECT id, nome, email FROM usuarios WHERE id = ?', [id]);

    return rows[0] || null;
}

async function atualizar(id, dados) {
    const campos = [];
    const valores = [];

    if(dados.nome !== undefined) { campos.push('nome = ?'); valores.push(dados.nome); }
    if(dados.email !== undefined) { campos.push('email = ?'); valores.push(dados.email); }
    if(dados.senha !== undefined) { campos.push('senha = ?'); valores.push(dados.senha); }

    valores.push(id);

    const [result] = await pool.execute(`UPDATE usuarios SET ${campos.join(', ')} WHERE id = ?`, valores);

    return result.affectedRows;
}

async function remover(id) {
    const [result] = await pool.execute('DELETE FROM usuarios WHERE id = ?', [id]);
    return result.affectedRows;
}

module.exports = {
    criar,
    listar,
    buscarPorId,
    atualizar,
    remover
};