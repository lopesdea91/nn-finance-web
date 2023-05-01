import { parseItemToOption } from "../parseItemToOption"

describe('src/utils/__test__/parseItemToOption.spec.ts', () => {
  it('parseItemToOption', () => {
    expect(
      parseItemToOption({
        id: 1,
        description: 'teste'
      })
    ).toEqual({
      id: 1,
      description: 'teste'
    })
  })
})