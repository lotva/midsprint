import { FilmSearchByFiltersResponseItems } from '@/common/api'
import { formatNumber } from '@/common/lib/formatNumber'
import { CompareButton, FavoriteButton } from '@/modules/user-collections'
import { withFallback } from 'vike-react-query'
import { usePaginatedMovies } from '../lib/usePaginatedMovies'
import { useSyncFilters } from '../lib/useSyncFilters'

export const MovieInfiniteList = withFallback(
	({ className = '' }: { className?: string }) => {
		const { filters } = useSyncFilters()
		const { movies, isFetchingNextPage, scrollTargetRef } = usePaginatedMovies(filters)

		return (
			<div className={`flex flex-col gap-3g ${className}`}>
				<ul className={GRID_LAYOUT}>
					{movies.map((movie) => (
						<MovieCard
							key={`${movie.kinopoiskId}-${movie.nameOriginal}`}
							movie={movie}
						/>
					))}
				</ul>

				<div
					className="py-3g flex justify-center items-center min-h-[100px]"
					ref={scrollTargetRef}
				>
					{isFetchingNextPage && (
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 border-2 border-border border-t-foreground-strong rounded-full animate-spin" />
							<span className="text-sm text-foreground-muted">Загрузка...</span>
						</div>
					)}
				</div>
			</div>
		)
	},
	({ className }) => (
		<div className={`${GRID_LAYOUT} animate-pulse ${className}`}>
			{[...Array(8)].map((_, i) => (
				<div key={i}>
					<MovieCardBase className="bg-muted" />
					<div className="mt-0.5g space-y-0.5g">
						<div className="h-3 bg-muted rounded w-full" />
						<div className="h-3 bg-muted rounded w-1/2" />
					</div>
				</div>
			))}
		</div>
	),
	({ error, retry }) => (
		<div className="p-3g bg-red-50 rounded-2xl text-center border border-red-100">
			<p className="text-red-600 text-sm mb-2g">Ошибка при загрузке: {error.message}</p>
			<button
				className="px-5 py-2 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 transition-colors"
				onClick={() => retry()}
			>
				Попробовать снова
			</button>
		</div>
	),
)

function MovieCard({ movie }: { movie: FilmSearchByFiltersResponseItems }) {
	const meta = [
		movie.year,
		formatNumber(movie.ratingKinopoisk || movie.ratingImdb, { minimumFractionDigits: 1 }),
	]
		.filter(Boolean)
		.join(' · ')

	return (
		<article className="clickable-area group">
			<MovieCardBase>
				<img
					alt={`Постер: ${movie.nameRu || movie.nameOriginal}`}
					className="h-full w-full object-cover transition-ease-out transition-transform duration-150 group-hover:scale-104"
					loading="lazy"
					src={movie.posterUrlPreview}
				/>
				<div
					className="
						absolute top-2 right-2 flex flex-col gap-0.25g z-2
						opacity-100
						md:opacity-0 md:group-hover:opacity-100
						transition-opacity
					"
				>
					<FavoriteButton
						className="px-0.5g py-0.25g min-w-0 shadow-sm text-sm"
						movie={movie}
						variant="icon-mobile"
					/>
					<CompareButton
						className="px-0.5g py-0.25g min-w-0 shadow-sm text-sm"
						movie={movie}
						variant="icon-mobile"
					/>
				</div>
			</MovieCardBase>

			<div className="mt-1g">
				<h2 className="text-sm font-medium leading-tight text-foreground-title pe-0.5g">
					<a
						className="clickable-area-trigger decoration-offset-[0.25em]"
						href={`/movie/${movie.kinopoiskId}`}
					>
						{movie.nameRu || movie.nameOriginal}
					</a>
				</h2>
				<p className="text-xs text-foreground-muted mt-1.5gr">{meta}</p>
			</div>
		</article>
	)
}

const GRID_LAYOUT = 'grid grid-cols-2 md:grid-cols-4 gap-x-0.5g gap-y-3g min-h-50vh'

const MovieCardBase = ({
	children,
	className = '',
}: {
	children?: React.ReactNode
	className?: string
}) => (
	<div className={`flex flex-col gap-0.5g ${className}`}>
		<div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-surface">{children}</div>
	</div>
)
