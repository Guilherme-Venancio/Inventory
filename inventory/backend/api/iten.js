module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = async (req, res) => {
        const iten = { ...req.body }
        
        if(req.params.id) iten.id = req.params.id

        try {
            existsOrError(iten.name, 'Nome não informado')
            existsOrError(iten.quantidade, 'Quantidade não informada')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(iten.id) {
            app.db('itens')
                .update(iten)
                .where({ id: iten.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('itens')
                .insert(iten)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('itens')
            .then(itens => res.json(itens))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsUpdated = await app.db('itens')
                .delete('modelo')
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'iten não foi encontrado.')
            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, remove }
}