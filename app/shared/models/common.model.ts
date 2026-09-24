export enum eScreenMode {
  View = 'VIEW',
  Create = 'CREATE',
  Edit = 'EDIT'
}
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

// Label / value row of an info card
export interface IInfoRow {
  label: string
  value: string
}

export interface IBreadcrumbItem {
  key: string
  label?: string
  // Absolute route path; omit for the current page (last item)
  to?: string
}

export interface ITabItem {
  key: string
  label: string
  // Absolute route path — the active tab follows the current URL
  to: string
  disabled?: boolean
  // Small counter badge next to the label (e.g. documents pending)
  count?: number
}

export interface IStep {
  title?: string
  description?: string
}
