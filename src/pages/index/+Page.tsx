import { Title } from '@/common/ui/Title'
import { MovieCatalog } from '@/modules/catalog'

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
