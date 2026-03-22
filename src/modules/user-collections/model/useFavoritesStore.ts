import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Movie, MovieId } from './types'

interface IStore {
	clearFavorites: () => void
	favorites: Array<Movie>
	isFavorite: (id: MovieId) => boolean
	toggleFavorite: (movie: Movie) => void
}

export const useFavoritesStore = create<IStore>()(
	persist(
		(set, get) => ({
			clearFavorites: () => set({ favorites: [] }),

			favorites: [],

			isFavorite: (id) => get().favorites.some((m) => m.kinopoiskId === id),

			toggleFavorite: (movie) => {
				set((state) => {
					const isFavorite = state.isFavorite(movie.kinopoiskId)

					return {
						favorites: isFavorite
							? state.favorites.filter((m) => m.kinopoiskId !== movie.kinopoiskId)
							: [...state.favorites, movie],
					}
				})
			},
		}),
		{ name: 'favorites-storage' },
	),
)
