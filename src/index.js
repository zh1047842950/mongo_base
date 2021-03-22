/**
 * @author Administrator
 * @date 2021-03-22 18:26
 */
const { spawn, exec, execFile } = require('child_process')

// exec('git --version', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`执行的错误: ${error}`)
//     return
//   }
//   console.log(`stdout: ${stdout}`)
//   console.error(`stderr: ${stderr}`)
// })

execFile('./shell.sh', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行的错误: ${error}`)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.error(`stderr: ${stderr}`)
})
