import * as exec from '@actions/exec'
import * as core from '@actions/core'

export async function processPodspec (
  podspecFilename: string,
  podspecDir: string
): Promise<Record<string, any>> {
  console.log(`Running 'pod ipc spec "${podspecFilename}"' in ${podspecDir}`)
  const podspec = await exec.getExecOutput(
    'pod',
    ['ipc', 'spec', podspecFilename],
    {
      cwd: podspecDir
    }
  )
  if (podspec.exitCode !== 0) {
    core.error(podspec.stderr)
    core.setFailed("'pod ipc spec' failed!")
    throw new Error("Failed to execute 'pod ipc spec' on podfile")
  }

  return JSON.parse(podspec.stdout)
}

export async function processPod (
  podName: string
): Promise<Record<string, any>> {
  console.log(`Running 'pod ipc spec "${podName}"'`)
  const podspec = await exec.getExecOutput('pod', ['spec', 'cat', podName])
  if (podspec.exitCode !== 0) {
    core.error(podspec.stderr)
    core.setFailed("'pod ipc spec' failed!")
    throw new Error("Failed to execute 'pod ipc spec' on podfile")
  }

  return JSON.parse(podspec.stdout)
}
