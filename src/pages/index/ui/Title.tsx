import styles from './Title.module.css'

export function Title() {
	return (
		<h1 className={styles.title}>
			Каталог фильмов <em className={styles.subtitle}>для «Мидспринта»</em>
		</h1>
	)
}
