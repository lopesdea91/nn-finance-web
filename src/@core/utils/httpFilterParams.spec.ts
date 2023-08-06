import httpFilterParams from './httpFilterParams'

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
      period: '2023-01',
      type_id: null
    })

    expect(res).toEqual({
      period: '2023-01'
    })
  })
})
