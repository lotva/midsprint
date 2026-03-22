import type { MouseEvent, PropsWithChildren, RefObject } from 'react'
import styles from './Dialog.module.css'

interface IProps extends PropsWithChildren {
	className?: string
	ref?: RefObject<HTMLDialogElement | null>
	title?: string
}

export const Dialog = ({ title, className, ref, children }: IProps) => {
	const handleDialogClick = (e: MouseEvent<HTMLDialogElement>) => {
		if (!ref?.current) return

		const rect = ref.current.getBoundingClientRect()
		const isInDialog =
			rect.top <= e.clientY &&
			e.clientY <= rect.top + rect.height &&
			rect.left <= e.clientX &&
			e.clientX <= rect.left + rect.width

		if (!isInDialog) {
			ref.current.close()
		}
	}

	const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

	return (
		<dialog
			className={`${styles.dialog} ${className}`}
			onClick={handleDialogClick}
			ref={ref}
		>
			{title && (
				<header className={styles.header}>
					<h2 className={`${styles.title} metrics-fix-disabled`}>{title}</h2>
					<button
						aria-label="Закрыть"
						className={`${styles.close} ${isSafari ? styles['is-safari'] : ''}`}
						onClick={() => ref?.current?.close()}
						type="button"
					>
						×
					</button>
				</header>
			)}
			<div>{children}</div>
		</dialog>
	)
}
