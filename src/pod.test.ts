import { processPodspec, processPod } from './pod'

describe('processPodspec', () => {
  it('parses a podspec', async () => {
    const podspec = await processPodspec('apptentive-fake-plugin.podspec', '.')
    expect(podspec.name).toEqual(
      'apptentive-fake-plugin'
    )
  })
})
