import { formatNumber } from '@/common/lib/formatNumber'
import { useCompareStore } from '../model/useCompareStore'
import styles from './CompareTable.module.css'

export function CompareTable() {
	const { compareList, clearCompare, removeFromCompare } = useCompareStore()

	if (compareList.length === 0) return null

	const movie1 = compareList[0]
	const movie2 = compareList[1]

	const renderCell = (title: string, value1: React.ReactNode, value2: React.ReactNode) => (
		<tr>
			<th className={styles.th}>
				<small className={styles['row-title']}>{title}</small>
				<span className={styles.value}>{value1 || '—'}</span>
			</th>
			<th className={styles.th}>
				<small className={styles['row-title']}>{title}</small>
				<span className={styles.value}>{value2 || '—'}</span>
			</th>
		</tr>
	)

	return (
		<section
			aria-labelledby="compare-table"
			className={styles['compare-table']}
		>
			<div className={styles.header}>
				<h2
					className={styles.title}
					id="compare-table"
				>
					Сравнение фильмов
				</h2>

				<button
					className="i-gravity-ui-xmark hover:color-primary transition-colors"
					onClick={clearCompare}
				/>
			</div>
			<table className={styles.table}>
				<tbody>
					<tr>
						<th className={styles.th}>
							<div className="flex justify-between items-center">
								<span className={styles['movie-title']}>
									{movie1.nameRu || movie1.nameOriginal}
								</span>
								<button
									className="i-gravity-ui-trash-bin text-xs text-foreground-muted hover:text-red-500"
									onClick={() => removeFromCompare(movie1.kinopoiskId)}
								/>
							</div>
						</th>
						<th className={styles.th}>
							{movie2 ? (
								<div className="flex justify-between items-center">
									<span className={styles['movie-title']}>
										{movie2.nameRu || movie2.nameOriginal}
									</span>
									<button
										className="i-gravity-ui-trash-bin text-xs text-foreground-muted hover:text-red-500"
										onClick={() => removeFromCompare(movie2.kinopoiskId)}
									/>
								</div>
							) : (
								<span className="text-foreground-muted">Выберите фильм</span>
							)}
						</th>
					</tr>
					{renderCell('Год выпуска', movie1.year, movie2?.year)}
					{renderCell(
						'Рейтинг',
						formatNumber(movie1.ratingKinopoisk || movie1.ratingImdb),
						formatNumber(movie2?.ratingKinopoisk || movie2?.ratingImdb),
					)}
					{renderCell(
						'Жанры',
						movie1.genres?.map((g) => g.genre).join(', '),
						movie2?.genres?.map((g) => g.genre).join(', '),
					)}
					{renderCell(
						'Длительность',
						movie1.filmLength ? `${movie1.filmLength} мин.` : undefined,
						movie2?.filmLength ? `${movie2.filmLength} мин.` : undefined,
					)}
				</tbody>
			</table>
		</section>
	)
}
