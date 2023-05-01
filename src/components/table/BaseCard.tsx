import { Box } from "@mui/system"
import { AppText } from "@/components/base"

const TCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      component="div"
      sx={{
        pt: 0.75,
        px: 0.75,
        '&': {
          border: '1px solid rgba(0, 0, 0, 0.15)',
          boxShadow: '0px 2px 4px 0px  rgba(0, 0, 0, 0.15)',
          borderRadius: '0.25rem',
        },
        '& .table-card-header': {
          padding: '0.25rem 0.25rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.25)',
          minHeight: '1.75rem'
        },
        '& .table-card-header:not(:last-child)': {
        },
        '& .table-card': {
          padding: '0.05rem 0.25rem',
        },
        '& .table-card:not(:last-child)': {
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      {children}
    </Box>
  )
}
const TCardHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="table-card-header"
      sx={{
        minHeight: '1rem',
        position: 'relative',
        '& .dropdown': {
          position: 'absolute',
          top: '-5px',
          right: '-7px',
        }
      }}
    >
      {children}
    </Box>
  )
}
const TCardRow = ({
  text,
  value
}: {
  text: string
  value: string | number
}) => {
  return (
    <Box className="table-card"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 0.5
      }}
      title={`${text} / ${value}`}
    >
      <AppText variant="body2"><i>{text}</i>:</AppText>
      <AppText
        variant="body2"
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >{value}</AppText>
    </Box>
  )
}

export const TableCard = {
  Container: TCard,
  Header: TCardHeader,
  Row: TCardRow,
}