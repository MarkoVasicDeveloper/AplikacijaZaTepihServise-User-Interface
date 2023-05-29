export function formValidation (value: string, field: string, dirty: boolean, required?: boolean): ValidationResponse {
  if (value.length === 0 && (required ?? false) && dirty) return new ValidationResponse(false, 'Ovo polje je obavezno!')

  if ((field === 'name' || field === 'surname') && (required ?? false)) {
    if (value.length < 3) return new ValidationResponse(false, 'Minimum tri karaktera!')

    if (value.length > 50) return new ValidationResponse(false, 'Ne vise od 50 karaktera!')
  }

  if (field === 'password' && (required ?? false)) {
    if (value.length < 6) return new ValidationResponse(false, 'Minimum sest karaktera!')
  }

  if (field === 'email' && (required ?? false)) {
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      return new ValidationResponse(false, 'Imejl nije validan!') 
    }
  }

  if (field === 'phone' && (required ?? false)) {
    if (!/^[0-9]+$/.test(value)) {
      return new ValidationResponse(false, 'Broj telefona nije validan!') 
    }
  }

  return { valid: true, value }
}

class ValidationResponse {
  valid: boolean
  value: string
  constructor (valid: boolean, value: string) {
    this.valid = valid
    this.value = value
  }
}
