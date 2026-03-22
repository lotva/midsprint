import { usePageContext } from 'vike-react/usePageContext'

export function NavigationLink({
	children,
	className,
	href,
}: {
	children: React.ReactNode
	className?: string
	href: string
}) {
	const { urlPathname } = usePageContext()

	const isActive = href === '/' ? urlPathname === href : urlPathname.startsWith(href)

	if (isActive) {
		return (
			<span
				aria-current="page"
				className={className}
			>
				{children}
			</span>
		)
	}

	return (
		<a
			className={className}
			href={href}
		>
			{children}
		</a>
	)
}
