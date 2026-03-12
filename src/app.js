const express = require('express')
const produtosRoutes = require('./routes/produtos')

const app = express()

app.use(express.json())

// middleware de log
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${new Date().toISOString()}`)
    next()
})

// middleware erro
app.use((err, req, res, next) => {
    res.status(500).json({ erro: err.message })
})

app.use('/api/v1/produtos', produtosRoutes)

app.listen(3000, () => {
    console.log("API rodando na porta 3000")
})