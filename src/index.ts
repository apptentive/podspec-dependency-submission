import path from 'path'
import fs from 'fs'
import * as core from '@actions/core'
import * as github from '@actions/github'
import {
  Snapshot,
  Manifest,
  submitSnapshot,
  PackageCache
} from '@github/dependency-submission-toolkit'

import { processPodspec } from './pod'

import { PackageURL } from 'packageurl-js'

const packageJson = require('../package')
const cache = new PackageCache()

async function main () {
  const podspecPath = path.normalize(
    core.getInput('podspec-path', { required: true })
  )

  if (
    !path.basename(podspecPath).endsWith('.podspec') ||
    !fs.existsSync(podspecPath)
  ) {
    throw new Error(`${podspecPath} is not a podspec file or does not exist!`)
  }

  const podspecDir = path.dirname(podspecPath)

  // Get pod name from podspec
  const [podname, dependencies] = await processPodspec(podspecPath, podspecDir)

  const manifest = new Manifest(podname, podspecPath)

  dependencies.forEach(async (depName: string) => {
    const packageURL = new PackageURL(
      'cocoapods',
      null,
      depName,
      null,
      null,
      null
    )

    cache.package(packageURL)

    const pkg = cache.lookupPackage(packageURL)

    if (pkg !== null) {
      manifest.addDirectDependency(pkg!)
    }

    // TODO: if podInfo has dependencies, recursively add them as transitive dependencies
  })

  const snapshot = new Snapshot(
    {
      name: packageJson.name,
      url: 'https://github.com/apptentive/podspec-dependency-submission',
      version: packageJson.version
    },
    github.context,
    {
      correlator: `${github.context.job}-${podname}`,
      id: github.context.runId.toString()
    }
  )
  snapshot.addManifest(manifest)
  submitSnapshot(snapshot)
}

main()
