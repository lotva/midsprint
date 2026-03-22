import { Film, FilmSearchByFiltersResponseItems } from '@/common/api'

export interface Movie extends Omit<Partial<Film>, 'type'> {
	type?: Required<FilmSearchByFiltersResponseItems>['type']
}

export type MovieId = Movie['kinopoiskId']
