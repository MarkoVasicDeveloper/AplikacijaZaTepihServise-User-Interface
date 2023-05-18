import { useState, useRef, useEffect } from 'react';

interface TextareaProps {
  name: string
  id: string
  onChangeInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  label: string
  placeholder?: string
  cleanUp?: boolean
}

export function Textarea({ name, id, onChangeInput, label, placeholder, cleanUp }: TextareaProps) {
  const [dirty, setDirty] = useState(false);
  const input = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { input.current!.value = '' }, [cleanUp]);
  
  return (
    <div className="textarea-container">
      {label ?
        <label htmlFor={id} className={dirty ? 'show-label' : ''}>{label}</label>
        : ''}
      <textarea 
        ref={input}
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