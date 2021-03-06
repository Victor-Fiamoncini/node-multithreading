const wt = require('worker_threads')
const { iterate } = require('fibonacci')

class MultiThreadedFibonacciService {
	async run({ iterations }) {
		return new Promise((resolve, reject) => {
			const worker = new wt.Worker(__filename, { workerData: { iterations } })

			worker.on('message', resolve)
			worker.on('error', reject)
			worker.on('exit', code => {
				if (code !== 0) {
					reject(new Error(`Worker has been stopped with error code: ${code}`))
				}
			})
		})
	}
}

if (!wt.isMainThread) {
	const result = iterate(wt.workerData.iterations)

	wt.parentPort.postMessage(result)
}

module.exports = MultiThreadedFibonacciService
