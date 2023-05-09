import { useState } from "react";
import { formValidation } from "../misc/formValidation";

export function useFormValidation (onChange: any, field: string, dirty: boolean, required?: boolean, value?: string):
{ validation: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void, invalid: boolean, message: string } {
  const [invalid, setInvalid] = useState(false);
  const [message, setMessage] = useState('');

  function validation (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>): void {
    if (!required) return onChange(event);
    const result = formValidation(event.target.value, field, dirty, required);
    if (!result.valid) {
      setInvalid(true)
      setMessage(result.value)
      onChange(event.target.name)
      if (field === 'checkbox') { onChange({ value, checked: false }); return }
      return
    };

    setInvalid(false)
    setMessage('')
    if (field === 'checkbox') { onChange({ value, checked: true }); return }
    onChange(event)
  }
  return { validation, message, invalid }
}
