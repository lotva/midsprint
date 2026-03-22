import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	className?: string
}

export function Button({ children, className, type = 'button', ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className={`${styles.button} ${className}`}
			type={type}
		>
			{children}
		</button>
	)
}
