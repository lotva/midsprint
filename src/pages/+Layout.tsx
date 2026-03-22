import '@/core/styles/index.css'
import 'virtual:uno.css'

import { NavigationLink } from '@/common/ui/NavigationLink'
import { CompareTable } from '@/modules/user-collections'
import { Logo } from '../common/ui/Logo'
import styles from './Layout.module.css'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header>
				<div>
					<NavigationLink href="https://github.com/lotva/midsprint">Исходный код</NavigationLink>
				</div>

				<Logo />

				<div className="text-align-end">
					<NavigationLink href="/favorites">Избранное</NavigationLink>
				</div>
			</Header>

			<main className="py-10g">
				<Content>{children}</Content>
			</main>

			<CompareTable />
		</>
	)
}

function Header({ children }: { children: React.ReactNode }) {
	return <header className={styles.header}>{children}</header>
}

function Content({ children }: { children: React.ReactNode }) {
	return <div data-page-transition>{children}</div>
}
