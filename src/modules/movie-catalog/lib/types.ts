import { GetApiV22FilmsData } from '@/common/api'

export type Filters = Omit<Required<GetApiV22FilmsData>['query'], 'page'>
