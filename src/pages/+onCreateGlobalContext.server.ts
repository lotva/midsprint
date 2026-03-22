import { initMswOnServer } from '@/common/lib/initMswOnServer'

export async function onCreateGlobalContext() {
	await initMswOnServer()
}
