import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	className?: string
	icon?: React.ReactNode
	variant?: 'default' | 'icon' | 'icon-mobile'
}

export function Button({
	children,
	className,
	type = 'button',
	variant,
	icon,
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			className={`${styles.button} ${variant && styles[variant]} ${className}`}
			type={type}
		>
			{icon}

			<span className={styles.text}>{children}</span>
		</button>
	)
}
