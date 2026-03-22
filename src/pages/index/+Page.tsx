import { MovieCatalog } from '@/modules/catalog'
import { Title } from './ui/Title'

export default function Page() {
	return (
		<>
			<Title>
				Каталог фильмов <em>для «Мидспринта»</em>
			</Title>

			<MovieCatalog className="mt-5g" />
		</>
	)
}
