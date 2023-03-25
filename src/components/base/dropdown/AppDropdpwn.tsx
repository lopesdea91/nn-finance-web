import React, { useImperativeHandle, useState } from 'react'
import { Menu, MenuItem } from '@mui/material'
import AppButton from '../button/AppButton'

type AppDropdownItemProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}
export const AppDropdownItem = (props: AppDropdownItemProps) => {
  return (
    <MenuItem
      sx={{ gap: 0.5, alignItems: 'center' }}
      onClick={props.onClick}
    >{props.children}</MenuItem>
  )
}
export type AppDropdownHandle = {
  handleClose: () => void
}
type AppDropdownProps = {
  toggle: React.ReactNode
  menu: React.ReactNode
}
export const AppDropdown = React.forwardRef<AppDropdownHandle, AppDropdownProps>(({ menu, toggle }, ref) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useImperativeHandle(ref, () => ({ handleClose }))

  return (
    <>
      <AppButton
        // aria-controls={open ? 'basic-menu' : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="text"
      >
        {toggle}
      </AppButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menu}
      </Menu>
    </>
  )
})

AppDropdown.displayName = 'AppDropdown'
