import Link from "next/link"
import { useRouter } from "next/router"
import { AppIcon } from "@/components/base"
import { menuList } from "@/content/layout-menu.content"
import { MenuItem, MenuGroup } from "@/types/layout"
import useLayoutStore from "@/hooks/useLayoutStore"

const LayoutMenuLinkItem = ({ label, href, icon }: MenuItem) => {
  const { asPath } = useRouter()

  const isActive = asPath === href ? '--active' : ''

  return (
    <Link className={`menu-link d-flex align-items-center justify-content-md-center justify-content-xl-start ${isActive}`} href={href} title={label}>
      <div className="menu-icon d-flex align-items-center justify-content-center">
        <AppIcon variant={icon} />
      </div>
      <span className={`menu-text d-inline-block d-md-none d-xl-inline-block py-1 flex-grow-1`}>
        {label}
      </span>
    </Link>
  )
}

const LayoutMenuGroupLinks = ({ title, href, icon, links }: MenuGroup) => {
  const { asPath } = useRouter()

  const isActive = asPath === href ? '--active' : ''

  const menuItems = links.map((item, i) => <LayoutMenuLinkItem {...item} key={`group-item-${title}-${i}`} />)

  const content = <>
    {href &&
      <div className="menu-icon d-flex align-items-center justify-content-center">
        <AppIcon variant={icon} />
      </div>
    }
    <span className={`d-inline-block d-md-none d-xl-inline-block py-1 flex-grow-1 ${href ? 'menu-text' : 'fw-light ps-2 text-muted'}`}>
      {title}
    </span>
  </>

  return (
    <li className="py-1 py-md-0 border mb-2">
      {href
        ? (
          <Link className={`menu-link d-flex align-items-center justify-content-center ${isActive}`} href={href} title={title}>
            {content}
          </Link>
        )
        : (
          <div className={`menu-link d-flex align-items-center justify-content-center ${isActive}`}>
            {content}
          </div>
        )
      }

      {menuItems}
    </li >
  )
}

export const LayoutMenu = () => {
  const { state } = useLayoutStore()

  const css = state.menu ? '--show' : ''

  const GroupLinks = menuList.map((group, i) => <LayoutMenuGroupLinks {...group} key={i} />)

  return (
    <div className={`app-layout_internal-menu border-right shadow-sm bg-white ${css}`}>
      <div
        className="menu-brand h6 border-bottom rounded-0 m-0 py-2 py-xl-3 px-0 d-none d-md-flex flex-column flex-xl-row align-items-center justify-content-center"
      >
        <span className="lh-1">nn</span>
        <span className="d-none d-xl-block">-</span>
        <span className="lh-1">finance</span>
      </div>

      <ul className="menu-list-group px-2 py-2 py-xl-3">
        {GroupLinks}
      </ul>
    </div >
  )
}