// oxlint-disable typescript/no-require-imports

const { gap, gapRelative } = require('./src/core/styles/functions')

module.exports = {
	plugins: [
		require('postcss-mixins')({
			mixinsFiles: 'src/core/styles/globals/mixins.pcss',
		}),
		require('postcss-functions')({
			functions: {
				gap,
				gapRelative,
			},
		}),
	],
}
