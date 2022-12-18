import React from 'react'
import { useRouter } from "next/router";
import { Dropdown } from "react-bootstrap";
import { AppDropdownItem } from "@/types/layout";

type Props = {
  title?: string
  children?: JSX.Element
  items: AppDropdownItem[]
}
const AppDropdown = React.forwardRef<any, Props>(({ title, children, items }: Props) => {
  const router = useRouter()

  const handleClick = ({ to, click }: AppDropdownItem) => {
    !!to && router.push(to)
    !!click && click()
  }

  const dropdownItems = items.map((item) => (
    <Dropdown.Item key={item.text} onClick={() => handleClick(item)}>
      {item.text}
    </Dropdown.Item>
  ))

  return (
    <Dropdown>
      <Dropdown.Toggle size="sm" as="span" className="border rounded-0 px-1">
        {title} {children}
      </Dropdown.Toggle>

      <Dropdown.Menu className="border rounded-0 p-0">
        {dropdownItems}
      </Dropdown.Menu>
    </Dropdown>
  )
});

AppDropdown.displayName = 'AppDropdown'

export { AppDropdown }
