import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type ReactElement, useLayoutEffect, useState } from 'react';

interface ButtonProps {
  type?: 'submit' | 'button'
  title?: string
  disabled?: boolean | undefined
  onClickFunction: ((param: any) => void) | ((param: any) => Promise<void>)
  implementClass?: string
  titleFusnote?: string
  default?: boolean
  icon?: IconDefinition
}

export function Button(data: ButtonProps): ReactElement {
  const [implementClasses, setImplementClasses] = useState('')

  useLayoutEffect(() => {
    if (data.type === 'submit') return setImplementClasses(data.disabled ? 'disabled' : 'submit')
    if (data.implementClass != null) return setImplementClasses(data.implementClass)
    if (data.default) setImplementClasses('default')
  }, [data])

  return (
    <button
      className={implementClasses}
      type={data.type ?? 'button'}
      disabled={data.disabled}
      onClick={data.onClickFunction}
      title={data.titleFusnote}
    >{data.icon ? <FontAwesomeIcon icon={data.icon} /> : data.title}</button>
  )
}
