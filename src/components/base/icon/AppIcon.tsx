import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  IconDefinition,
  faBars, faGear, faHouse, faCashRegister, faReceipt, faArrowRightFromBracket, faCreditCard, faSave,
  faRemove, faRotateBack, faEdit, faSearch, faPlus, faBroom, faWallet, faCalendarDays, faArrowLeft, faArrowRight,
  faX,
  faSpinner
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef } from 'react'

export type IconNames = 'menu'
  | 'gear'
  | "home"
  | "calendarDays"
  | "cashRegister"
  | "receipt"
  | "creditCard"
  | "signOut"
  | "spinner"
// | 'search'
// | 'new'
// | 'edit'
// | "save"
// | "remove"
// | "reset"
// | "clean"
// | "wallet"
// | "arrowLeft"
// | "arrowRight"
// | "arrowRight"
// | "close"

type Props = {
  className?: string
  variant: IconNames
}

export const AppIcon = ({ variant, ...rest }: Props) => {
  const isMounted = useRef<boolean>(false)
  const variants: Record<IconNames, IconDefinition> = {
    menu: faBars,                     // menu
    gear: faGear,                     // config
    home: faHouse,                    // home
    calendarDays: faCalendarDays,     // calendario
    cashRegister: faCashRegister,     // novo item 
    receipt: faReceipt,               // listas
    creditCard: faCreditCard,         // faturas
    spinner: faSpinner,
    signOut: faArrowRightFromBracket, // sair
    // search: faSearch,
    // new: faPlus,
    // edit: faEdit,
    // save: faSave,
    // remove: faRemove,
    // reset: faRotateBack,
    // clean: faBroom,
    // wallet: faWallet,
    // arrowLeft: faArrowLeft,
    // arrowRight: faArrowRight,
    // close: faX
  }
  const selected = variants[variant]

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
    }
    return () => {
      isMounted.current = false
    }
  }, [])

  return isMounted.current ? <FontAwesomeIcon icon={selected} {...rest} /> : null
}