import React from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import { Form, FormSelectProps } from 'react-bootstrap'

type Props = FormSelectProps & {
  label?: string
  text?: string
  error?: string | undefined | any
}

const AppSelect = React.forwardRef<any, Props>(({ children, label, text, error, ...rest }, ref) => {

  return (
    <Form.Group className="position-relative mb-1 px-1" controlId={label} ref={ref}>
      {label &&
        <Form.Label style={{ fontSize: '11px' }} className='mb-1 text-sm'>{label}</Form.Label>
      }

      <Form.Select className="shadow-sm" size='sm' {...rest}>
        {children}
      </Form.Select>

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

AppSelect.displayName = 'AppSelect'

export { AppSelect }