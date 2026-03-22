import { formatNumber } from '@/common/lib/formatNumber'
import { Button } from '@/common/ui/Button'
import { MovieInfiniteList } from '@/modules/catalog/ui/MovieInfiniteList'
import { useEffect, useRef, useState } from 'react'
import { Movie } from '../model/types'
import { useFavoritesStore } from '../model/useFavoritesStore'

export function FavoritesView() {
	const favorites = useFavoritesStore((state) => state.favorites)

	if (favorites.length === 0) return <EmptyView />

	return (
		<ul className="flex flex-col">
			{favorites.map((favorite) => (
				<FavoriteItem
					key={favorite.kinopoiskId}
					movie={favorite}
				/>
			))}
		</ul>
	)
}

function FavoriteItem({ movie }: { movie: Movie }) {
	const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

	const [isRemoving, setIsRemoving] = useState(false)
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const SECONDS_TO_REMOVE = 5

	const handleToggle = () => {
		if (isRemoving) {
			if (timerRef.current) clearTimeout(timerRef.current)
			setIsRemoving(false)
		} else {
			setIsRemoving(true)
			timerRef.current = setTimeout(() => {
				toggleFavorite(movie)
			}, SECONDS_TO_REMOVE * 1000)
		}
	}

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current)
		}
	}, [])

	return (
		<li
			className={`b-t b-t-solid b-border transition-opacity ${isRemoving ? 'opacity-40' : 'opacity-100'}`}
		>
			<article className="grid grid-cols-[100px_1fr] gap-2g py-1.5g items-start">
				<img
					alt={movie.nameRu || ''}
					className="w-full aspect-[2/3] object-cover rounded-sm bg-surface"
					src={movie.posterUrlPreview}
				/>

				<div className="flex flex-col gap-0.5g h-full">
					<div className="flex justify-between items-baseline gap-1g">
						<h2 className="text-l font-bold leading-tight">
							<a href={`/movie/${movie.kinopoiskId}`}>{movie.nameRu || movie.nameOriginal}</a>
						</h2>
						{movie.ratingKinopoisk && (
							<span className="text-primary text-metrics-fix">
								{formatNumber(movie.ratingKinopoisk)}
							</span>
						)}
					</div>

					<Button
						className="text-s self-start mt-auto flex"
						onClick={handleToggle}
					>
						{isRemoving ? 'Вернуть' : 'Удалить'}
					</Button>
				</div>
			</article>
		</li>
	)
}

function EmptyView() {
	return (
		<>
			<p className="text-lg text-align-center">Избранного нет, но есть другие фильмы:</p>
			<MovieInfiniteList className="mt-2g" />
		</>
	)
}
