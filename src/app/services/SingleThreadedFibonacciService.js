const { iterate } = require('fibonacci')

class SingleThreadedFibonacciService {
	run({ iterations }) {
		return iterate(iterations)
	}
}

module.exports = SingleThreadedFibonacciService
