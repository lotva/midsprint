import '@/core/styles/index.css'
import 'virtual:uno.css'

import { NavigationLink } from '@/common/ui/NavigationLink'
import { MswProvider } from '@/core/layout/MswProvider'
import { Logo } from './index/ui/Logo'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<MswProvider>
			<header className="flex justify-between gap-1g py-1.5g">
				<div className="flex gap-1g">
					<NavigationLink href="/">Welcome</NavigationLink>
					<NavigationLink href="/todo">Todo</NavigationLink>
				</div>

				<Logo />

				<div className="flex gap-1g">
					<NavigationLink href="/star-wars">Data Fetching</NavigationLink>
				</div>
			</header>

			<main className="py-10g">
				<Content>{children}</Content>
			</main>
		</MswProvider>
	)
}

function Content({ children }: { children: React.ReactNode }) {
	return (
		<div data-page-transition>
			<div>{children}</div>
		</div>
	)
}
