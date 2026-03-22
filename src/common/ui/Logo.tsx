import styles from './Logo.module.css'
import { NavigationLink } from './NavigationLink'

export function Logo() {
	return (
		<NavigationLink
			aria-label="Главная страница каталога"
			className={styles.logo}
			href="/"
		>
			<span
				aria-hidden="true"
				className="text-metrics-fix"
			>
				MDSP
			</span>
		</NavigationLink>
	)
}
