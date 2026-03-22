import { MovieCatalog } from '@/modules/movie-catalog'
import { Title } from './ui/Title'

export default function Page() {
	return (
		<>
			<Title />

			<MovieCatalog className="mt-5g" />
		</>
	)
}
