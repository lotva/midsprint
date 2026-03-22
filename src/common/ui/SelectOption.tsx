import React from 'react'
import styles from './SelectOption.module.css'

interface IProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
	children: React.ReactNode
	ref?: React.Ref<HTMLOptionElement>
}

export const SelectOption = ({ children, className, ref, ...props }: IProps) => {
	return (
		<option
			className={`${styles.option} ${className || ''}`}
			ref={ref}
			{...props}
		>
			{children}
		</option>
	)
}
