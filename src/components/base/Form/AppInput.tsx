import React, { useRef } from 'react'
import { Form, FormControlProps } from 'react-bootstrap'

type Props = FormControlProps & {
  label?: string
  text?: string
  error?: string | undefined | any
  value: string | number
}

const AppInput = React.forwardRef<any, Props>(({ children, label, text, error, ...rest }, ref) => {

  return (
    <Form.Group className="position-relative mb-1 px-1" controlId={label} ref={ref}>
      {label &&
        <Form.Label style={{ fontSize: '11px' }} className='mb-1'>{label}</Form.Label>
      }

      <Form.Control className="shadow-sm" type="text" size='sm' {...rest} />

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

AppInput.displayName = 'AppInput'

export { AppInput }