import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { useFormValidation } from '../../../hooks/useFormValidation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface InputParam {
  onChangeInput: (data: string) => void
  onEnter?: (() => void ) | any
  type?: string
  name: string
  id: string
  required?: boolean
  footnoteTitle?: string
  placeholder?: string
  icon?: IconDefinition
  cleanUp?: boolean
  label?: string
}

export function Input({ icon, onChangeInput, onEnter, type, name, id, required, footnoteTitle, placeholder, cleanUp, label }: InputParam): JSX.Element {
  const [dirty, setDirty] = useState(false);
  const [implementClass, setImplementClass] = useState('');
  const input = useRef<HTMLInputElement>(null);

  const { validation, message, invalid } = useFormValidation(onChangeInput, name, dirty, required);

  function setOnEnter (event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      (event.target as HTMLInputElement).value = ''
      onChangeInput(name)
      onEnter();
    }
  };

  useEffect(() => { input.current!.value = '' }, [cleanUp]);
  useLayoutEffect(() => {
    if (label) return setImplementClass('text-input');
    setImplementClass('login-input');
  }, [label])

  return (
    <div className='input-container'>
      {label ? 
        <label htmlFor={id} className={dirty ? 'show-label' : ''}>{ label }</label>
        : '' }
      <div className="input">
        {icon !== undefined ?
        <span>
          <FontAwesomeIcon icon={icon}/>
        </span>
        : ''}
        <input
            ref={input}
            className={ invalid ? 'input-invalid' : implementClass}
            name = { name }
            type = { type ?? 'text'}
            onChange={(event) => { validation(event) }}
            onKeyUp={(event) => { setOnEnter(event) }}
            id = { id }
            onFocus = {() => { setDirty(true) }}
            onBlur = {(event) => { validation(event) }}
            value = { type === 'radio' ? id : undefined }
            title = { footnoteTitle }
            placeholder = { placeholder }
        />
      </div>
      {
        required ?
        <div className='message'>
          <span className='invalid'>{message}</span>
        </div> : ''
      }
    </div>
  )
}
