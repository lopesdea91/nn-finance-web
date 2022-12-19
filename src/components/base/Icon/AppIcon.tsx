import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition, faBars, faUserAlt, faHouse, faCashRegister, faReceipt, faRectangleList, faCreditCard, faSave, faRemove, faRotateBack, faEdit, faPlus, faBroom } from '@fortawesome/free-solid-svg-icons'

export type IconNames = 'menu'
  | 'profile'
  | "home"
  | "cashRegister"
  | "receipt"
  | "aaa"
  | "creditCard"
  | 'new'
  | 'edit'
  | "save"
  | "remove"
  | "reset"
  | "clean"

type Props = {
  className?: string
  variant: IconNames
}

export const AppIcon = ({ variant, ...rest }: Props) => {
  const variants: Record<IconNames, IconDefinition> = {
    menu: faBars,
    profile: faUserAlt,
    home: faHouse,
    cashRegister: faCashRegister,
    receipt: faReceipt,
    aaa: faRectangleList,
    creditCard: faCreditCard,
    new: faPlus,
    edit: faEdit,
    save: faSave,
    remove: faRemove,
    reset: faRotateBack,
    clean: faBroom,
  }
  const selected = variants[variant]

  return variant ? <FontAwesomeIcon icon={selected} {...rest} /> : null
}