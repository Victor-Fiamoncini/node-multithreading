const express = require('express')

const SingleThreadedFibonacciService = require('./app/services/SingleThreadedFibonacciService')
const MultiThreadedFibonacciService = require('./app/services/MultiThreadedFibonacciService')
const MultiThreadedPoolFibonacciService = require('./app/services/MultiThreadedPoolFibonacciService')

const app = express()

app.get('/', (req, res) => res.json({ message: 'server is alive' }))

app.get('/single-fibonacci/:iterations', (req, res) => {
	const { iterations } = req.params

	const singleThreadedFibonacciService = new SingleThreadedFibonacciService()

	const result = singleThreadedFibonacciService.run({ iterations })

	return res.status(200).json(result)
})

app.get('/multi-fibonacci/:iterations', async (req, res) => {
	const { iterations } = req.params

	const multiThreadedFibonacciService = new MultiThreadedFibonacciService()

	const result = await multiThreadedFibonacciService.run({ iterations })

	return res.status(200).json(result)
})

app.get('/multi-pool-fibonacci/:iterations', async (req, res) => {
	const { iterations } = req.params

	const multiThreadedPoolFibonacciService = new MultiThreadedPoolFibonacciService()

	const result = await multiThreadedPoolFibonacciService.run({ iterations })

	return res.status(200).json(result)
})

module.exports = app
