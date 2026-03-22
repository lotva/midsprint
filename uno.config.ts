import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
	presets: [
		presetWind4({
			preflight: 'on-demand',
			preflights: {
				reset: false,
				theme: 'on-demand',
			},
		}),
	],

	rules: [
		[
			/^(p|m|w|h|gap)(t|r|b|l|x|y|s|e|bs|be)?-([\d.]+)g(r)?$/,
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
					x: property === 'gap' ? [base] : [`${base}-inline-start`, `${base}-inline-end`],
					y: property === 'gap' ? [base] : [`${base}-block-start`, `${base}-block-end`],
				}

				const properties = directiveMap[directive ?? '']
				if (!properties) return

				return Object.fromEntries(properties.map((p) => [p, value]))
			},
		],
	],

	theme: {
		colors: {
			background: 'var(--color__background)',
			foreground: 'var(--color__foreground)',
		},
	},
})
