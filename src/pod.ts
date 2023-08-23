import * as exec from '@actions/exec'
import * as core from '@actions/core'

export async function processPodspec (
  podspecFilename: string,
  podspecDir: string
): Promise<[string, string[]]> {
  console.log(`Running 'pod ipc spec "${podspecFilename}"' in ${podspecDir}`)
  const podspecOutput = await exec.getExecOutput(
    'pod',
    ['ipc', 'spec', podspecFilename],
    {
      cwd: podspecDir
    }
  )
  if (podspecOutput.exitCode !== 0) {
    core.error(podspecOutput.stderr)
    core.setFailed("'pod ipc spec' failed!")
    throw new Error("Failed to execute 'pod ipc spec' on podfile")
  }

  const podspec = JSON.parse(podspecOutput.stdout)

  return [podspec.name, Object.keys(podspec.dependencies)]
}

export async function processPod (
  podName: string
): Promise<Record<string, any>> {
  console.log(`Running 'pod spec cat "${podName}"'`)
  const podspec = await exec.getExecOutput('pod', ['spec', 'cat', podName])
  if (podspec.exitCode !== 0) {
    core.error(podspec.stderr)
    core.setFailed("'pod ipc spec' failed!")
    throw new Error("Failed to execute 'pod ipc spec' on podfile")
  }

  return JSON.parse(podspec.stdout)
}
