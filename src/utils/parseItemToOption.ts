export const parseItemToOption = ({ id, description }: Partial<{ id: number | null, description: string }>) => {
  return {
    id: Number(id),
    description: String(description),
  }
}