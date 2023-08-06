import httpParseParams from './httpParseParams'

describe('src/@core/utils/httpParseParams', () => {
  it('execute object with array value', () => {
    const res = httpParseParams({
      period: '2023-01',
      type_id: 2,
      tag_ids: [1, 2]
    })
    expect(res).toBe('period=2023-01&type_id=2&tag_ids[]=1&tag_ids[]=2')
  })

  it('execute object without array value', () => {
    const res = httpParseParams({
      period: '2023-01',
      type_id: 2
    })
    expect(res).toBe('period=2023-01&type_id=2')
  })
})
