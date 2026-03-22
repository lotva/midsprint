import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Movie, MovieId } from './types'

interface IStore {
	addToCompare: (movie: Movie) => void
	clearCompare: () => void
	compareList: Array<Movie>
	removeFromCompare: (id: MovieId) => void
	toggleCompare: (movie: Movie) => void
}

export const useCompareStore = create<IStore>()(
	persist(
		(set, get) => ({
			addToCompare: (movie) => {
				const { compareList } = get()
				if (compareList.some((m) => m.kinopoiskId === movie.kinopoiskId)) return

				if (compareList.length >= 2) {
					set({ compareList: [...compareList.slice(1), movie] })
				} else {
					set({ compareList: [...compareList, movie] })
				}
			},

			clearCompare: () => set({ compareList: [] }),

			compareList: [],

			removeFromCompare: (id) =>
				set((state) => ({
					compareList: state.compareList.filter((m) => m.kinopoiskId !== id),
				})),

			toggleCompare: (movie) => {
				const { compareList, removeFromCompare, addToCompare } = get()
				if (compareList.some((m) => m.kinopoiskId === movie.kinopoiskId)) {
					removeFromCompare(movie.kinopoiskId)
				} else {
					addToCompare(movie)
				}
			},
		}),
		{ name: 'compare-storage' },
	),
)
