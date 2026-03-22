import { Button } from '@/common/ui/Button'
import { Dialog } from '@/common/ui/Dialog'
import { useRef } from 'react'
import { Movie } from '../model/types'
import { useFavoritesStore } from '../model/useFavoritesStore'

interface IProps extends Omit<React.ComponentProps<typeof Button>, 'children'> {
	movie: Movie | undefined
}

export function FavoriteButton({ movie, className, ...props }: IProps) {
	const dialogRef = useRef<HTMLDialogElement>(null)

	const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
	const isFavorite = useFavoritesStore((state) => state.isFavorite(movie?.kinopoiskId ?? 0))

	const handleToggle = (e: React.MouseEvent) => {
		if (!movie) return
		e.preventDefault()
		e.stopPropagation()

		if (isFavorite) {
			toggleFavorite(movie)
			return
		}

		dialogRef.current?.showModal()
	}

	const confirmAdd = () => {
		if (movie) {
			toggleFavorite(movie)
			dialogRef.current?.close()
		}
	}

	return (
		<>
			<Button
				{...props}
				className={`${className ?? ''} ${isFavorite ? 'opacity-90' : ''}`}
				onClick={handleToggle}
			>
				<span
					className={isFavorite ? 'i-gravity-ui-heart-fill color-primary' : 'i-gravity-ui-heart'}
				/>
				{isFavorite ? 'В избранном' : 'В избранное'}
			</Button>

			<Dialog
				ref={dialogRef}
				title="Добавить в избранное?"
			>
				<Button
					className="mt-4g flex w-full justify-center rounded-[var(--dialog-radius-inner)]"
					onClick={confirmAdd}
				>
					Да, добавить
				</Button>
			</Dialog>
		</>
	)
}
