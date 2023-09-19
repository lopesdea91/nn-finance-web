import { httpFilterParams } from './'

describe('src/@core/utils/httpParseParams', () => {
  it('execute object with array value', () => {
    const res = httpFilterParams({
      period: '2023-01',
      type_id: 2,
      tag_ids: [1, 2]
    })

    expect(res).toEqual({
      period: '2023-01',
      type_id: 2,
      tag_ids: [1, 2]
    })
  })

  it('execute object without array value', () => {
    const res = httpFilterParams({
      keyStringEmpty: '2023-01',
      keyStringNoEmpty: '',
      keyNull: null,
      arrayEmpety: [],
      arrayNoEmpety: [1],
      keyUndefined: undefined,
      keyNumber: 1
    })

    expect(res).toEqual({
      keyStringEmpty: '2023-01',
      arrayNoEmpety: [1],
      keyNumber: 1
    })
  })
})
