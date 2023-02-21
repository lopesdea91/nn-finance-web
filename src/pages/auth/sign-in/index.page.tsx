import React from 'react'
import { SignInForm } from '@/components/form/SignInForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMemory } from '@fortawesome/free-solid-svg-icons'
export default function Page() {
  return (
    <>
      <FontAwesomeIcon icon={faMemory} />
      <SignInForm />
    </>
  )
}

Page.layout = 'public'
