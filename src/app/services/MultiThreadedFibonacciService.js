const {
	Worker,
	isMainThread,
	parentPort,
	workerData,
} = require('worker_threads')
const { iterate } = require('fibonacci')

class MultiThreadedFibonacciService {
	async run({ iterations }) {
		return new Promise((resolve, reject) => {
			const worker = new Worker(__filename, { workerData: { iterations } })

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

if (!isMainThread) {
	const result = iterate(workerData.iterations)

	parentPort.postMessage(result)
}

module.exports = MultiThreadedFibonacciService
