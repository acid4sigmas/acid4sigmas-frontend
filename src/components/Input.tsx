


interface InputProps {
    name?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    placeholder?: string;
    password?: boolean;
}
  
const Input: React.FC<InputProps> = ({
    name = '',
    value = '',
    onChange,
    required = false,
    placeholder = '',
    password = false,
  }) => {
    return (
      <input
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        type={password ? 'password' : 'text'}
        placeholder={placeholder}
        className={
            [
                "px-3 py-1",
                "border border-primary rounded-lg", 
                "focus:outline-none focus:ring-2 focus:ring-blue-500",
                "bg-secondary opacity-80 drop-shadow-lg",
                "text-primary-text-color"
            ].join(" ")
        }
      />
    );
};
  
  export default Input;