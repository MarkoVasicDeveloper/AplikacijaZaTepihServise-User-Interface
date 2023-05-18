import { type ReactElement, useLayoutEffect, useState } from 'react';

interface ButtonProps {
  type?: 'submit' | 'button'
  title: string
  disabled?: boolean | undefined
  onClickFunction: ((param: any) => void) | ((param: any) => Promise<void>)
  implementClass?: string
  titleFusnote?: string
  default?: boolean
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
    >{data.title}</button>
  )
}
