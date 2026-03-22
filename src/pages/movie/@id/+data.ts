import { getApiV22FilmsById } from '@/common/api'
import { useConfig } from 'vike-react/useConfig'
import { PageContextServer } from 'vike/types'

export type Data = Awaited<ReturnType<typeof data>>

export async function data(pageContext: PageContextServer) {
	const config = useConfig()

	const { data } = await getApiV22FilmsById({
		path: {
			id: Number(pageContext.routeParams.id),
		},
	})

	config({
		description: data?.description || data?.editorAnnotation,
		title: data?.nameRu || data?.nameOriginal,
	})

	return { data }
}
