import { getApiV22FilmsFiltersOptions } from '@/common/api/codegen/@tanstack/react-query.gen'
import { formatNumber } from '@/common/lib/formatNumber'
import { DebouncedInput } from '@/common/ui/DebouncedInput'
import { Select } from '@/common/ui/Select'
import { SelectOption } from '@/common/ui/SelectOption'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Filters } from '../lib/types'
import { useSyncFilters } from '../lib/useSyncFilters'

export function FiltersBar() {
	const { filters, updateFilters } = useSyncFilters()

	const { data } = useSuspenseQuery({ ...getApiV22FilmsFiltersOptions(), staleTime: Infinity })

	const limitedGenres = data?.genres?.slice(0, 6) || []

	return (
		<div className="flex items-center gap-0.5g flex-wrap">
			<Select
				aria-label="Тип контента"
				onChange={(e) => updateFilters({ type: e.target.value as Filters['type'] })}
				value={filters.type || ''}
			>
				<SelectOption value="">Все типы</SelectOption>
				<SelectOption value="FILM">Фильмы</SelectOption>
				<SelectOption value="TV_SERIES">Сериалы</SelectOption>
			</Select>

			<Select
				aria-label="Жанр"
				onChange={(e) =>
					updateFilters({
						genres: e.target.value !== '' ? [Number(e.target.value)] : undefined,
					})
				}
				value={filters.genres?.[0] ?? ''}
			>
				<SelectOption value="">Все жанры</SelectOption>
				{limitedGenres.map((genre, index) => (
					<SelectOption
						key={genre.id || index}
						value={String(genre.id || index)}
					>
						{genre.genre}
					</SelectOption>
				))}
			</Select>

			<Select
				aria-label="Минимальный рейтинг"
				onChange={(e) => updateFilters({ ratingFrom: Number(e.target.value) || undefined })}
				value={filters.ratingFrom ? String(filters.ratingFrom) : ''}
			>
				<SelectOption value="">Любой рейтинг</SelectOption>
				{[9.0, 8.0, 7.0, 6.0, 5.0].map((rating) => (
					<SelectOption
						key={rating}
						value={String(rating)}
					>
						От {formatNumber(rating, { minimumFractionDigits: 1 })}
					</SelectOption>
				))}
			</Select>

			<label className="flex items-center gap-1">
				От
				<DebouncedInput
					className="bg-surface border border-border rounded-lg px-2 py-1 text-s w-24 h-full outline-none focus:border-primary transition-colors"
					max="2026"
					min="1990"
					onDebouncedChange={(val) => updateFilters({ yearFrom: val ? Number(val) : undefined })}
					placeholder="1990"
					type="number"
					value={filters.yearFrom}
				/>
				года
			</label>
		</div>
	)
}
