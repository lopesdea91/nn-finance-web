import React from 'react'
import { Form, FormControlProps } from 'react-bootstrap'

type Props = FormControlProps & {
  label?: string
  text?: string
  error?: string | undefined
}

export const AppInput = React.forwardRef<any, Props>(({ children, label, text, error, ...rest }, ref) => {

  return (
    <Form.Group ref={ref} className="mb-2 position-relative" controlId={label}>
      {label &&
        <Form.Label className='mb-1'>{label}</Form.Label>
      }

      <Form.Control className="shadow-sm" size='sm' {...rest} />

      {text &&
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      }

      {error &&
        <span className='position-absolute bottom-1 end-0 lh-1 text-danger' style={{ fontSize: '12px' }}>{error}</span>}
    </Form.Group>
  )
});


// export const AppInput = ({ children, label, text, error, ...rest }: Props) => {
// }