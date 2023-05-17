import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Menu, MenuItem } from '@mui/material'
import AppButton from '../button/AppButton'

export type AppDropdownHandle = {
  handleClose: () => void
}

type AppDropdownItemProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}
const AppDropdownItem = (props: AppDropdownItemProps) => {
  return (
    <MenuItem
      sx={{ gap: 0.5, alignItems: 'center' }}
      onClick={props.onClick}
    >{props.children}</MenuItem>
  )
}
AppDropdownItem.displayName = 'AppDropdownItem'


type AppDropdownProps = {
  toggle: React.ReactNode
  menu: React.ReactNode
}
const AppDropdownContainer = forwardRef(({ menu, toggle }: AppDropdownProps, ref) => {  // <AppDropdownHandle, AppDropdownProps>
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useImperativeHandle(ref, () => ({
    handleClose: () => {
      handleClose()
    }
  }))

  return (
    <>
      <AppButton
        // aria-controls={open ? 'basic-menu' : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="text"
        sx={{
          p: 0,
          '&.MuiButton-root': {
            minWidth: '2.5rem'
          }
        }}
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
AppDropdownContainer.displayName = 'AppDropdownContainer'

export const AppDropdown = {
  Container: AppDropdownContainer,
  Item: AppDropdownItem,
}

