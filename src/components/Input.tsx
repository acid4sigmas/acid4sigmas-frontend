import { Ref, useEffect, useRef, useState } from "react";

export namespace Input {
  interface TextProps {
    name?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    placeholder?: string;
    password?: boolean;
  }
  
  export const Text: React.FC<TextProps> = ({
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

  interface CodeProps {
    name?: string;
    value?: string;
    callback: (code: string) => void;
    required?: boolean;
  }

  export const Code: React.FC<CodeProps> = ({
    name = '',
    value = '',
    callback,
    required = false
  }) => {
    const [code, setCode] = useState('');

    const inputRefs = [
      useRef<HTMLInputElement>(null),
      useRef<HTMLInputElement>(null),
      useRef<HTMLInputElement>(null),
      useRef<HTMLInputElement>(null),
      useRef<HTMLInputElement>(null),
      useRef<HTMLInputElement>(null),
    ];

    const resetCode = () => {
      inputRefs.forEach((ref) => {
        if (ref.current) {
          ref.current.value = '';
        }
      });
      inputRefs[0].current?.focus();
      setCode('');
    };


    useEffect(() => {
      value = code;
      console.log("actual code: " + code );

      if (code.length === 6) {
        if (typeof callback === 'function') callback(code);
        resetCode();
      }
      
    }, [code]);

    function handleInput(e: React.ChangeEvent<HTMLInputElement>, index: number) {
      const input = e.target;
      const previousInput = inputRefs[index - 1];
      const nextInput = inputRefs[index + 1];

      const newCode = [...code];

      if (/^[a-z]+$/.test(input.value)) {
        const uc = input.value.toUpperCase();
        newCode[index] = uc;
        if (inputRefs[index].current) {
          inputRefs[index].current.value = uc;
        }
      } else {
        newCode[index] = input.value;
      }
      setCode(newCode.join(''));

      input.select();

      if (input.value === '') {
        if (previousInput) {
          previousInput.current?.focus();
        }
      } else if (nextInput) {
        nextInput.current?.select();
      }

    }

    function handleFocus(e: any) {
      e.target.select();
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
      const input = e.target as HTMLInputElement;
      const previousInput = inputRefs[index - 1];
      const nextInput = inputRefs[index + 1];

      if (e.key === "Backspace" && input.value === '')  {
        e.preventDefault();
        setCode((prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1));
        if (previousInput) {
          previousInput.current?.focus();
        }
      } else if (input.value !== '' && e.key !== "Backspace") {
        e.preventDefault();
        if (nextInput) {
          nextInput.current?.focus();
        }
      }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      const pastedCode = e.clipboardData.getData('text');

      if (pastedCode.length === 6) {
        setCode(pastedCode);
        inputRefs.forEach((inputRef, index) => {
          if (inputRef.current) {
            inputRef.current.value = pastedCode.charAt(index);
          }
        });
      }
    }

    const ClearButton = () => {
      return (
        <button
          onClick={resetCode}
          className="text-2xl"
        >reset</button>
      )
    }

    return (
      <div className="flex gap-2 relative">
        {[0, 1, 2, 3, 4, 5, ].map((index: number) => (
          <input 
            className="text-2xl bg-gray-100 w-10 flex p-2 text-center"
            key={index}
            type="text"
            maxLength={1}
            onChange={(e) => handleInput(e, index)}
            ref={inputRefs[index]}
            autoFocus={index === 0}
            onFocus={handleFocus}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
          />
        ))} 
      </div>
    )

  }


}