import { initMswOnServer } from '@/common/lib/initMswOnServer'

export async function onCreatePageContext() {
	await initMswOnServer()
}
