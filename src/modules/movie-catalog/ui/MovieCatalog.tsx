import { FiltersBar } from './FiltersBar'
import { MovieInfiniteList } from './MovieInfiniteList'

export function MovieCatalog({ className }: { className?: string }) {
	return (
		<section
			aria-label="Фильтры и список фильмов"
			className={`flex flex-col gap-1g ${className}`}
		>
			<FiltersBar />
			<MovieInfiniteList />
		</section>
	)
}
