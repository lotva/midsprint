import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
	presets: [
		presetWind4({
			preflight: 'on-demand',
			preflights: {
				reset: false,
				theme: {
					mode: 'on-demand',
				},
			},
		}),
	],

	rules: [
		[
			/^([pmwh]|gap)(?:-?([trblxyse]|bs|be))?-([\d.]+)g(r)?$/,
			(match) => {
				const [, property, directive, n, relative] = match

				const gapProperty = relative ? '--gap--relative' : '--gap'
				const value = `calc(var(${gapProperty}) * ${n})`

				const baseMap = {
					gap: 'gap',
					h: 'height',
					m: 'margin',
					p: 'padding',
					w: 'width',
				} as const

				const base = baseMap[property as keyof typeof baseMap]
				if (!base) return

				if (property === 'gap') {
					if (directive === 'x') return { 'column-gap': value }
					if (directive === 'y') return { 'row-gap': value }
					if (!directive) return { gap: value }
					return
				}

				const directiveMap: Record<string, Array<string>> = {
					'': [base],
					b: [`${base}-bottom`],
					be: [`${base}-block-end`],
					bs: [`${base}-block-start`],
					e: [`${base}-inline-end`],
					l: [`${base}-left`],
					r: [`${base}-right`],
					s: [`${base}-inline-start`],
					t: [`${base}-top`],
					x: [`${base}-inline-start`, `${base}-inline-end`],
					y: [`${base}-block-start`, `${base}-block-end`],
				}

				const properties = directiveMap[directive ?? '']
				if (!properties) return

				return Object.fromEntries(properties.map((p) => [p, value]))
			},
		],
	],

	theme: {
		animation: {
			durations: {
				DEFAULT: 'var(--animation__duration)',
				fast: 'var(--animation__duration--fast)',
			},
			timingFns: {
				DEFAULT: 'var(--animation__ease)',
				'in-out': 'var(--animation__ease-in-out)',
				out: 'var(--animation__ease-out)',
			},
		},

		colors: {
			background: 'var(--color__background)',
			border: 'var(--color__border)',
			foreground: {
				DEFAULT: 'var(--color__foreground)',
				muted: 'var(--color__foreground--muted)',
				strong: 'var(--color__foreground--strong)',
				subtitle: 'var(--color__foreground--subtitle)',
				title: 'var(--color__foreground--title)',
			},
			muted: {
				DEFAULT: 'var(--color__muted)',
				active: 'var(--color__muted--active)',
				hover: 'var(--color__muted--hover)',
			},
			outline: 'var(--color__outline)',
			primary: {
				DEFAULT: 'var(--color__primary)',
				active: 'var(--color__primary--active)',
				disabled: 'var(--color__primary--disabled)',
				hover: 'var(--color__primary--hover)',
			},
			surface: 'var(--color__surface)',
		},

		duration: {
			DEFAULT: 'var(--animation__duration)',
			fast: 'var(--animation__duration--fast)',
		},

		ease: {
			DEFAULT: 'var(--animation__ease)',
			'in-out': 'var(--animation__ease-in-out)',
			out: 'var(--animation__ease-out)',
		},

		fontWeight: {
			bold: 'var(--typography__font-weight--bold)',
			light: 'var(--typography__font-weight--light)',
			medium: 'var(--typography__font-weight--medium)',
			normal: 'var(--typography__font-weight)',
		},

		leading: {
			normal: 'var(--typography__leading)',
			tight: 'var(--typography__leading--tight)',
		},

		radius: {
			DEFAULT: 'var(--radius)',
			lg: 'var(--radius__lg)',
			sm: 'var(--radius__sm)',
		},

		text: {
			'2xl': { fontSize: 'var(--font-size__2xl)' },
			lg: { fontSize: 'var(--font-size__l)' },
			sm: {
				fontSize: 'var(--font-size__s)',
				letterSpacing: 'var(--typography__tracking--wide)',
				lineHeight: 'var(--typography__leading--tight)',
			},
			xl: { fontSize: 'var(--font-size__xl)' },
		},

		tracking: {
			normal: 'var(--typography__tracking)',
			tight: 'var(--typography__tracking--tight)',
			tighter: 'var(--typography__tracking--tighter)',
			wide: 'var(--typography__tracking--wide)',
			widest: 'var(--typography__tracking--widest)',
		},
	},
})
