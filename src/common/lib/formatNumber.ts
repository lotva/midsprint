export const formatNumber = (number: number | undefined | null) => {
	return number?.toLocaleString('ru-RU')
}
