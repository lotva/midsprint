import { Button } from '@/common/ui/Button'
import { Movie } from '../model/types'
import { useCompareStore } from '../model/useCompareStore'

interface IProps extends Omit<React.ComponentProps<typeof Button>, 'children'> {
	movie: Movie | undefined
}

export function CompareButton({ movie, className, ...props }: IProps) {
	const toggleCompare = useCompareStore((state) => state.toggleCompare)
	const isCompared = useCompareStore((state) =>
		state.compareList.some((m) => m.kinopoiskId === movie?.kinopoiskId),
	)

	const handleToggle = (e: React.MouseEvent) => {
		if (!movie) return
		e.preventDefault()
		e.stopPropagation()
		toggleCompare(movie)
	}

	return (
		<Button
			{...props}
			className={`${className ?? ''} ${isCompared ? 'bg-primary! text-white!' : ''}`}
			icon={<span className={isCompared ? 'i-gravity-ui-copy-check' : 'i-gravity-ui-copy'} />}
			onClick={handleToggle}
		>
			{isCompared ? 'В сравнении' : 'К сравнению'}
		</Button>
	)
}
