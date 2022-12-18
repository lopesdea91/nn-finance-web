import Link from "next/link"

type ItemProps = { text: string, href: string }
const Item = ({ text, href }: ItemProps) => {
  return (
    <Link href={href} className="btn btn-sm btn-light border">
      {text}
    </Link>
  )
}

const Menu = ({ title, items }: { title: string, items: ItemProps[] }) => {
  const links = items.map((item, i) => <Item {...item} key={`${title}-${i}`} />)

  return (
    <div className="col">

      <h3 className="fs-6 border-bottom">{title}</h3>

      <div className="d-flex flex-wrap gap-2">
        {links}
      </div>
    </div>
  )
}

const MenuAccont = () => {
  const items = [
    { text: 'Perfil', href: '/settings/account' }
  ]
  return <Menu title="Conta" items={items} />
}
const MenuFinance = () => {
  const items = [
    { text: 'Carteira', href: '/settings/finance/wallet' },
    { text: 'Grupo', href: '/settings/finance/group' },
    { text: 'Catetgoria', href: '/settings/finance/category' },
    { text: 'Origins', href: '/settings/finance/origin' },
  ]
  return <Menu title="Finança" items={items} />
}

export default () => {

  return (
    <div className="page bg-white border-bottom p-2 rounded shadow-sm">
      <h2 className="fs-4 mb-2 border-bottom">Configuração</h2>

      <div className="my-0 row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
        <MenuAccont />
        <MenuFinance />
      </div>
    </div>
  )
}