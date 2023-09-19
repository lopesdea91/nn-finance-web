interface httpPrepareUrlProps {
  url: string
  id?: number
  queryString?: string
}

export const httpPrepareUrl = ({ url, id, queryString }: httpPrepareUrlProps) => {
  if (id) {
    url += `/${id}`
  }
  if (queryString) {
    url += `?${queryString}`
  }

  return url
}
