export const cssMerge = (...args: (string | undefined)[]) => {
  return args.filter(Boolean).join(' ')
}