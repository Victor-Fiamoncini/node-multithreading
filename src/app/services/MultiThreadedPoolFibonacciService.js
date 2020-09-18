const wt = require('worker_threads')
const Pool = require('worker-threads-pool')
const { cpus } = require('os')
const { iterate } = require('fibonacci')

const numberOfCpuCores = cpus.length
const threadPool = new Pool({ max: numberOfCpuCores })

class MultiThreadedPoolFibonacciService {
	async run({ iterations }) {
		return new Promise((resolve, reject) => {
			threadPool.acquire(
				__filename,
				{ workerData: { iterations } },
				(err, worker) => {
					if (err) reject(err)

					worker.on('message', resolve)
					worker.on('error', reject)
					worker.on('exit', code => {
						if (code !== 0) {
							reject(
								new Error(`Worker has been stopped with error code: ${code}`)
							)
						}
					})
				}
			)
		})
	}
}

if (!wt.isMainThread) {
	const result = iterate(wt.workerData.iterations)

	wt.parentPort.postMessage(result)
}

module.exports = MultiThreadedPoolFibonacciService
