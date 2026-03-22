import { MovieInfiniteList } from '@/modules/movie-list/MovieInfiniteList'
import { Title } from './ui/Title'

export default function Page() {
	return (
		<>
			<Title />

			<MovieInfiniteList className="mt-5g" />
		</>
	)
}
