import React, { useId } from 'react'
import styles from './Select.module.css'

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	ariaInvalid?: boolean | string
	ref?: React.Ref<HTMLSelectElement>
}

export const Select = ({ children, ariaInvalid, className = '', ref, ...props }: IProps) => {
	const internalId = useId()

	const isInvalid = ariaInvalid !== undefined ? ariaInvalid : props['aria-invalid']

	return (
		<div className={styles.root}>
			<select
				aria-invalid={isInvalid as boolean | undefined}
				className={`${styles.select} ${className}`}
				id={props.id || internalId}
				ref={ref}
				{...props}
			>
				{children}
			</select>

			<span
				aria-hidden="true"
				className={styles.chevron}
			>
				<span className={styles.icon}>›</span>
			</span>
		</div>
	)
}

Select.displayName = 'Select'
