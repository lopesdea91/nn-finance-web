
export const parseQueryUrlForm = (query: { id: string | string[] | undefined, copy?: string | string[] | undefined }) => {
  return {
    isNew: query?.id === 'new',
    isEdit: query?.id !== 'new',
    isCopy: !!query?.copy,
    id: Number(query.copy || query.id)
  }
}