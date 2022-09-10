interface InputProps {
    label: string,
    id: string,
    value: string,
    onChange: (e: any) => void,
    type?: string
}

export default function InputField ({label, id, value, onChange, type = 'text'}: InputProps) {
    return (
        <div className="clientInput">
          <label htmlFor={id}>{label}</label>
          <input
            type={type}
            id={id}
            value={value}
            onChange={(e) =>onChange(e)}
          />
        </div>
    )
}