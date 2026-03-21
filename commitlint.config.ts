import { RuleConfigSeverity, type UserConfig } from '@commitlint/types'

export default {
	extends: ['@commitlint/config-conventional'],
	formatter: '@commitlint/format',
	rules: {
		'body-max-length': [RuleConfigSeverity.Disabled],
		'body-max-line-length': [RuleConfigSeverity.Disabled],
	},
} as UserConfig
