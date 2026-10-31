import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
const require = createRequire(import.meta.url)
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const processes = []
let stopping = false
function stop(code = 0) {
  if (stopping) return
  stopping = true
  for (const child of processes) child.kill()
  process.exitCode = code
}
function start(entry, args) {
  const child = spawn(process.execPath, [entry, ...args], { cwd: root, stdio: 'inherit', windowsHide: true })
  processes.push(child)
  child.on('error', error => { console.error(error.message); stop(1) })
  child.on('exit', code => { if (!stopping) stop(code ?? 1) })
}
start(require.resolve('json-server/lib/cli/bin.js'), ['--watch', 'db.json', '--host', '127.0.0.1', '--port', '3001'])
start(resolve(dirname(require.resolve('vite/package.json')), 'bin/vite.js'), ['--host', '127.0.0.1', '--port', '5174', '--strictPort'])
process.on('SIGINT', () => stop())
process.on('SIGTERM', () => stop())
