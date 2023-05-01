import { convertObjectToString } from "../convertObjectToString"

describe('src/utils/__test__/convertObjectToString.spec.ts', () => {
  it('convertObjectToString', () => {
    expect(
      convertObjectToString({ wallet_id: 1, status_id: 2 })
    ).toBe('?wallet_id=1&status_id=2')
  })
})