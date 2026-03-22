import { Button } from '@/common/ui/Button'
import { Movie } from '../model/types'
import { useFavoritesStore } from '../model/useFavoritesStore'

interface IProps {
	className?: string
	movie: Movie | undefined
}

export function FavoriteButton({ movie, className }: IProps) {
	const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
	const isFavorite = useFavoritesStore((state) => state.isFavorite(movie?.kinopoiskId ?? 0))

	const handleToggle = (e: React.MouseEvent) => {
		if (!movie) return

		e.preventDefault()
		e.stopPropagation()
		toggleFavorite(movie)
	}

	return (
		<Button
			className={className}
			onClick={handleToggle}
		>
			<span
				className={isFavorite ? 'i-gravity-ui-heart-fill color-primary' : 'i-gravity-ui-heart'}
			/>

			{isFavorite ? 'В избранном' : 'В избранное'}
		</Button>
	)
}
