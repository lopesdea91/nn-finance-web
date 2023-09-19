export const convertNumberToCurrency = (
  value: number,
  { options: optionsParams, locale: localeParams }: { locale?: string; options?: Intl.NumberFormatOptions } = {}
) => {
  const options = { style: 'currency', currency: 'BRL', ...optionsParams }
  const locale = localeParams || 'pt-BR'

  return new Intl.NumberFormat(locale, options).format(value)
}
