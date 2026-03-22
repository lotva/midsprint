// oxlint-disable sort-keys
import { useIntersectionObserver } from '@siberiacancode/reactuse'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { fetchMovies } from '../api'

export function usePaginatedMovies() {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
		queryKey: ['movies', 'infinite'],
		queryFn: ({ pageParam }) => fetchMovies({ pageParam }),

		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = allPages.length + 1

			const maxPages = Math.min(lastPage.data?.totalPages || 0, 20)

			return nextPage <= maxPages ? nextPage : undefined
		},

		staleTime: 60 * 1000,
	})

	const movies = useMemo(() => data.pages.flatMap((page) => page.data?.items || []), [data])

	const { ref: scrollTargetRef, entries } = useIntersectionObserver<HTMLDivElement>({
		onChange: (entries) => {
			const [entry] = entries
			if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
				fetchNextPage()
			}
		},
		rootMargin: '300px',
		threshold: 0.1,
	})

	// Load proactively on large screens:

	useEffect(() => {
		const isVisible = entries?.[0]?.isIntersecting
		if (isVisible && hasNextPage && !isFetchingNextPage) {
			const timeout = setTimeout(() => fetchNextPage(), 100)
			return () => clearTimeout(timeout)
		}
	}, [entries, hasNextPage, isFetchingNextPage, fetchNextPage])

	return {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		movies,
		scrollTargetRef,
	}
}
