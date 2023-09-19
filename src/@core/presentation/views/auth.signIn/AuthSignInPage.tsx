import React from 'react'
import { Form } from './components'
import { Loading } from '../../shared/components/loading'
import { PageProps } from './AuthSignInPage.type'
import { Alert } from '../../shared/ui'
import { pageMethods } from './AuthSignInPage.methods'

export const AuthSignInPage = (props: PageProps) => {
  return (
    <>
      {!!props.message.text && (
        <Alert.Root type={props.message.type} className='max-w-md'>
          <Alert.Text>
            {props.message.text}
          </Alert.Text>
        </Alert.Root>
      )}

      <div className='m-2 p-6 rounded w-full max-w-md  border-[1px]border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800'>
        <div className=' pb-1 mb-4  text-gray-800 dark:text-gray-100 border-b-[1px] border-b-zinc-500 flex'>
          <h1 className='text-2xl uppercase mr-auto'>
            Bem vindo!
          </h1>

          <Loading />
        </div>

        <Form
          handleSubmit={p => pageMethods.onSubmit(p)}
        />
      </div>
    </>
  )
}

AuthSignInPage.layout = 'auth'