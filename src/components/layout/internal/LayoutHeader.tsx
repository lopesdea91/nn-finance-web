import { AppDropdown, AppIcon } from "@/components/base"
import { headerMenu } from "@/content/layout-header-menu.content";
import useLayoutStore from "@/hooks/useLayoutStore";
import Link from "next/link";

export const LayoutHeader = () => {
  const { state, toggleMenu } = useLayoutStore()

  return (
    <div className="app-layout_internal-header d-flex align-items-center gap-1 p-2 border-bottom rounded shadow-sm bg-white">
      <Link
        className="header-brand h6 border-bottom rounded-0 m-0 py-1 px-2 text-center d-md-none"
        href="/dashboard"
      >
        nn-finance
      </Link>

      <div className="header-profile ms-auto">
        <AppDropdown items={headerMenu}>
          <AppIcon variant="profile" />
        </AppDropdown>
      </div>

      <div
        className="header-menu d-md-none d-flex align-items-center justify-content-center px-2 border rounded-0"
        onClick={toggleMenu}
      >
        <AppIcon variant="menu" />
      </div>
    </div >
  )
}