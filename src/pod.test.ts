import { processPodspec } from './pod'

jest.setTimeout(20000)

describe('processPodspec', () => {
  it('parses a podspec', async () => {
    const [podName, dependencies] = await processPodspec(
      'apptentive-fake-plugin.podspec',
      '.'
    )
    expect(podName).toEqual('apptentive-fake-plugin')
    expect(dependencies).toEqual(['ApptentiveKit'])
  })
})
