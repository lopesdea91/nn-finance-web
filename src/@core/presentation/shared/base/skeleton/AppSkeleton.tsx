import { Skeleton, SkeletonProps, Stack, StackProps } from '@mui/material'
import React from 'react'

type Props = SkeletonProps

export const AppSkeleton = (props: Props) => {
  return (
    <Skeleton variant='rounded' {...props} />
  )
}

export const AppSkeletonContainer = (p: StackProps) => <Stack spacing={1} {...p} /> 