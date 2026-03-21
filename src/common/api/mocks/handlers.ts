import { fromOpenApi } from '@msw/source/open-api'
import spec from './openapi.json'

export const handlers = await fromOpenApi(spec as unknown as string)
