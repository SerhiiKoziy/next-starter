import React from 'react'

import { Button as ButtonComponent, ButtonProps } from '@material-ui/core';

import styles from './styles.modules.scss'

export const Button: React.FC<ButtonProps> = (props) => {
  const { variant, disableElevation, disableRipple, ...rest } = props

  return (
    <ButtonComponent
      className={styles['button']}
      variant={variant ?? 'contained'}
      disableElevation={disableElevation ?? true}
      disableRipple={disableRipple ?? true}
      { ...rest }
    />
  )
}
