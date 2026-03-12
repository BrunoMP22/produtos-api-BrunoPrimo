let produtos = []
let nextId = 1

function listar(req, res) {
    res.status(200).json(produtos)
}

function buscarPorId(req, res) {

    const id = Number(req.params.id)

    const produto = produtos.find(p => p.id === id)

    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" })
    }

    res.status(200).json(produto)
}

function criar(req, res) {

    const { nome, descricao, preco, categoria, estoque } = req.body

    if (!nome) {
        return res.status(400).json({ erro: "Nome é obrigatório" })
    }

    const produto = {
        id: nextId++,
        nome,
        descricao,
        preco,
        categoria,
        estoque,
        ativo: true,
        criado_em: new Date(),
        atualizado_em: new Date()
    }

    produtos.push(produto)

    res.status(201).json(produto)
}

function atualizar(req, res) {

    const id = Number(req.params.id)

    const index = produtos.findIndex(p => p.id === id)

    if (index === -1) {
        return res.status(404).json({ erro: "Produto não encontrado" })
    }

    const atualizado = {
        ...produtos[index],
        ...req.body,
        atualizado_em: new Date()
    }

    produtos[index] = atualizado

    res.status(200).json(atualizado)
}

function remover(req, res) {

    const id = Number(req.params.id)

    const index = produtos.findIndex(p => p.id === id)

    if (index === -1) {
        return res.status(404).json({ erro: "Produto não encontrado" })
    }

    produtos.splice(index, 1)

    res.status(204).send()
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    remover
}