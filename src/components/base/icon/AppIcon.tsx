import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  IconDefinition,
  faBars, faGear, faHouse, faCashRegister, faReceipt, faArrowRightFromBracket, faCreditCard, faSave,
  faRemove, faRotateBack, faEdit, faSearch, faPlus, faBroom, faCalendarDays,
  faEllipsisV, faTrashCan,
  faSpinner,
  faArrowsRotate,
  faArrowLeft,
  faArrowRight,
  faFilter,
} from '@fortawesome/free-solid-svg-icons'
import { faCopy, faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

export type IconNames = 'menu'
  | 'gear'
  | "home"
  | "calendarDays"
  | "cashRegister"
  | "receipt"
  | "creditCard"
  | "signOut"
  | "spinner"
  | 'new'
  | 'edit'
  | "save"
  | "remove"
  | "reset"
  | 'search'
  | "clean"
  | 'ellipsisV'
  | 'copy'
  | 'circleCheck'
  | 'trash'
  | 'sync'
  | 'arrowLeft'
  | 'arrowRight'
  | 'filterList'
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
  const variants: Record<IconNames, IconDefinition> = {
    menu: faBars,                     // menu
    gear: faGear,                     // config
    home: faHouse,                    // home
    calendarDays: faCalendarDays,     // calendario
    cashRegister: faCashRegister,     // novo item 
    receipt: faReceipt,               // listas
    creditCard: faCreditCard,         // faturas
    signOut: faArrowRightFromBracket, // sair
    spinner: faSpinner,               // loading
    new: faPlus,
    edit: faEdit,
    save: faSave,
    remove: faRemove,
    reset: faRotateBack,
    search: faSearch,
    clean: faBroom,
    ellipsisV: faEllipsisV,
    copy: faCopy,
    circleCheck: faCircleCheck,
    trash: faTrashCan,
    sync: faArrowsRotate,
    // wallet: faWallet,
    arrowLeft: faArrowLeft,
    arrowRight: faArrowRight,
    filterList: faFilter
    // close: faX
  }
  const selected = variants[variant]

  return <FontAwesomeIcon icon={selected} {...rest} />
}

export default AppIcon