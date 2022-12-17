import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition, faBars, faUserAlt, faHouse, faCashRegister, faReceipt, faRectangleList, faCreditCard } from '@fortawesome/free-solid-svg-icons'

export type IconNames = 'menu'
  | 'profile'
  | "home"
  | "cashRegister"
  | "receipt"
  | "aaa"
  | "creditCard"

type Props = {
  variant: IconNames
}

export const AppIcon = (props: Props) => {
  const variants: Record<IconNames, IconDefinition> = {
    menu: faBars,
    profile: faUserAlt,
    home: faHouse,
    cashRegister: faCashRegister,
    receipt: faReceipt,
    aaa: faRectangleList,
    creditCard: faCreditCard,

  }
  const variant = variants[props.variant]

  return props.variant ? <FontAwesomeIcon icon={variant} /> : null
}