import { useState } from 'react';

import './textarea.scss';

interface TextareaProps {
  name: string
  id: string
  onChangeInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  label: string
  placeholder?: string
}

export function Textarea({ name, id, onChangeInput, label, placeholder }: TextareaProps) {
  const [dirty, setDirty] = useState(false);
  
  return (
    <div className="textarea-container">
      {label ?
        <label htmlFor={id} className={dirty ? 'show-label' : ''}>{label}</label>
        : ''}
      <textarea 
        className='textarea'
        name={name}
        id={id}
        onChange={(e) => onChangeInput(e)}
        onFocus={() => setDirty(true)}
        placeholder={placeholder}>
      </textarea>
    </div>
  )
}