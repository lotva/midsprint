import styles from './Logo.module.css'

export function Logo() {
	return (
		<span
			aria-label="Логотип каталога"
			className={styles.logo}
			role="img"
		>
			<span className="text-metrics-fix">MDSP</span>
		</span>
	)
}
