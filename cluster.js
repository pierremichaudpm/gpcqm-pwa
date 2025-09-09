// High-performance cluster launcher for Node.js/Express on Railway
// Uses one worker per CPU core (or WORKERS env), auto-restarts on crash

const cluster = require('cluster');
const os = require('os');

const desired = (process.env.WORKERS || 'max').toLowerCase();
const cpuCount = os.cpus().length;
const numWorkers = desired === 'max' ? cpuCount : Math.max(1, parseInt(desired, 10) || cpuCount);

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} starting ${numWorkers} workers (cpus=${cpuCount})`);

  const fork = (i) => {
    const worker = cluster.fork({ WORKER_INDEX: String(i + 1) });
    console.log(`Started worker ${worker.id} (pid=${worker.process.pid})`);
    return worker;
  };

  // Spawn workers
  for (let i = 0; i < numWorkers; i++) fork(i);

  // Auto-restart on exit
  cluster.on('exit', (worker, code, signal) => {
    console.error(`Worker ${worker.id} (pid=${worker.process.pid}) exited (code=${code}, signal=${signal}). Restarting...`);
    setTimeout(() => fork(worker.id - 1), 500);
  });

  // Graceful shutdown
  const shutdown = () => {
    console.log('Primary received shutdown signal. Stopping workers...');
    for (const id in cluster.workers) {
      try { cluster.workers[id].disconnect(); } catch (_) {}
    }
    setTimeout(() => process.exit(0), 5000);
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
} else {
  // Worker: run the express server
  process.title = `node:worker:${process.env.WORKER_INDEX || cluster.worker?.id || ''}`;
  // Export worker id for server logging
  process.env.WORKER_ID = String(process.env.WORKER_INDEX || cluster.worker?.id || '');
  require('./server');
}


