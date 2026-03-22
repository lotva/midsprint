export const formatNumber = (
	number: number | undefined | null,
	options?: Intl.NumberFormatOptions,
): string => {
	if (number === undefined || number === null) return ''

	return number.toLocaleString('ru-RU', options)
}
