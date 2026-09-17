export interface IRouteHandle {
  titleHeaderKeys?: string[]
  titlePageKey?: string
  backToListPage?: boolean
  isCheckUniversity?: boolean
}
export interface IBaseFilterPanel {
  keyword?: string
}
export interface IBasePagination {
  page?: number
  size?: number
}

export interface IApiPagination<T> {
  content?: T[]
  page?: number
  size?: number
  totalElements?: number
  totalPages?: number
  last?: boolean
}

export interface IApiResponse<T> {
  result?: boolean
  data?: T
  message?: string
  code?: number | string
}

export interface IApiErrorResponse<T> {
  code?: string
  message?: string
  status?: string
  traceId?: string
  data?: T
}
export interface IOption {
  label?: string
  value?: string
}
export interface ISidebarMenu {
  title: string
  url: string
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  isActive?: boolean
  isOpen?: boolean
  items?: {
    title: string
    url: string
    hiddenSubMenu?: boolean
  }[]
}
