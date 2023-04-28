import { useState } from 'react'
import './input.scss'
import { useFormValidation } from '../../../hooks/useFormValidation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface InputParam {
  onChangeInput: any
  onEnter?: any
  type?: string
  name: any
  id: string
  required?: boolean
  footnoteTitle?: string
  placeholder?: string
  icon: IconDefinition
}

export function Input ({ icon, onChangeInput, onEnter, type, name, id, required, footnoteTitle, placeholder }: InputParam): JSX.Element {
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
                className={ invalid ? 'input-invalid' : 'default-input'}
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
          <div className='message'>
            <span className='invalid-input'>{message}</span> 
          </div>
        </div>
  )
}
