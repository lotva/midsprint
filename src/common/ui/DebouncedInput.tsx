import { useDebounceValue } from '@siberiacancode/reactuse'
import { useEffect, useState } from 'react'

interface IProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
	delay?: number
	onDebouncedChange: (value: string | undefined) => void
	value: string | number | undefined
}

const getValidatedValue = (value: string, min?: string | number, max?: string | number) => {
	if (value === '') return { fixed: undefined, isValid: true }

	const number = Number(value)
	const minValue = min !== undefined ? Number(min) : -Infinity
	const maxValue = max !== undefined ? Number(max) : Infinity

	if (number < minValue) return { fixed: String(minValue), isValid: false }
	if (number > maxValue) return { fixed: String(maxValue), isValid: false }

	return { fixed: value, isValid: true }
}

export function DebouncedInput({
	value,
	onDebouncedChange,
	delay = 300,
	className,
	min,
	max,
	...props
}: IProps) {
	const [localValue, setLocalValue] = useState<string>(String(value ?? ''))
	const [prevValue, setPrevValue] = useState(value)

	if (value !== prevValue) {
		setLocalValue(String(value ?? ''))
		setPrevValue(value)
	}

	const debouncedValue = useDebounceValue(localValue, delay)

	useEffect(() => {
		const { isValid, fixed } = getValidatedValue(debouncedValue, min, max)

		if (isValid && String(value ?? '') !== debouncedValue) {
			onDebouncedChange(fixed)
		}
	}, [debouncedValue, onDebouncedChange, value, min, max])

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const { isValid, fixed } = getValidatedValue(localValue, min, max)

		if (!isValid) {
			setLocalValue(fixed ?? '')
			onDebouncedChange(fixed)
		}

		props.onBlur?.(e)
	}

	return (
		<input
			{...props}
			className={className}
			max={max}
			min={min}
			onBlur={handleBlur}
			onChange={(e) => setLocalValue(e.target.value)}
			value={localValue}
		/>
	)
}
