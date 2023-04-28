import { useState } from 'react'
import './input.scss'
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
  icon: IconDefinition
}

export function InputWithValidation ({ icon, onChangeInput, onEnter, type, name, id, required, footnoteTitle, placeholder }: InputParam): JSX.Element {
  const [dirty, setDirty] = useState(false)

  const { validation, message, invalid } = useFormValidation(onChangeInput, name, dirty, required);

  function setOnEnter (event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      (event.target as HTMLInputElement).value = ''
      onChangeInput(name)
      onEnter();
    }
  }

  return (
        <div className='input-container'>
          <div className="input">
            <span>
              <FontAwesomeIcon icon={icon} />
            </span>
            <input
                className={ invalid ? 'input-invalid' : ''}
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
