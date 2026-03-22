import '@/core/styles/index.css'
import 'virtual:uno.css'

import { NavigationLink } from '@/common/ui/NavigationLink'
import { Logo } from '../common/ui/Logo'
import styles from './Layout.module.css'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header>
				<NavigationLink href="/">Welcome</NavigationLink>

				<Logo />

				<div className="text-align-end">
					<NavigationLink href="/star-wars">Data Fetching</NavigationLink>
				</div>
			</Header>

			<main className="py-10g">
				<Content>{children}</Content>
			</main>
		</>
	)
}

function Header({ children }: { children: React.ReactNode }) {
	return <header className={styles.header}>{children}</header>
}

function Content({ children }: { children: React.ReactNode }) {
	return <div data-page-transition>{children}</div>
}
