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
