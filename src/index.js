import express from 'express'
import fibonacci from 'fibonacci'

const app = express()

app.get('/', (req, res) => res.json({ hello: 'world ☕️' }))

app.get('/fibonacci', (req, res) => {
	const resultOfIterations = fibonacci.iterate(10000)

	return res.status(200).json({ result: resultOfIterations })
})

const PORT = 3333

app.listen(PORT, () => console.log(`Server running at: ${PORT} ☕️`))
