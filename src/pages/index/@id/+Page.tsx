import { formatNumber } from '@/common/lib/formatNumber.js'
import { useData } from 'vike-react/useData'
import { Title } from '../ui/Title.js'
import type { Data } from './+data.js'

export default function Page() {
	const { data } = useData<Data>()

	const meta = [
		data?.year && `Год: ${data.year}`,
		data?.ratingKinopoisk && `Рейтинг: ${formatNumber(data.ratingKinopoisk)}`,
		data?.ratingImdb && `IMDb: ${formatNumber(data.ratingImdb)}`,
	].join(' · ')

	return (
		<>
			<small className="block text-sm text-align-center">{meta}</small>

			<Title className="mt-1gr">{data?.nameRu || data?.nameOriginal}</Title>

			<div className="max-w-60% mx-auto mt-3g">
				{data?.description && <p className="mt-2g text-lg">{data?.description}</p>}

				{data?.slogan && <p className="mt-2g text-lg">Слоган: {data.slogan}</p>}

				{data?.genres.length !== 0 && (
					<p className="mt-2g text-lg">
						Жанры: {data?.genres?.map((genre) => genre.genre).join(', ')}
					</p>
				)}

				<img
					alt={`Постер ${data?.nameRu || data?.nameOriginal}`}
					className="w-full mt-3g object-cover aspect-[2/3] bg-surface rounded-lg"
					fetchPriority="high"
					src={data?.posterUrl}
				/>
			</div>
		</>
	)
}
