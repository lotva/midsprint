import styles from './Title.module.css'

export function Title({
	className = '',
	children,
}: {
	children: React.ReactNode
	className?: string
}) {
	return <h1 className={`${styles.title} ${className}`}>{children}</h1>
}
