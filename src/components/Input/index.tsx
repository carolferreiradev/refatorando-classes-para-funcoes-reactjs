import { useField } from '@unform/core';
import { ComponentType, InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string,
  icon?: ComponentType<IconBaseProps>,
  placeholder: string
}

export function Input({ name, icon: Icon, placeholder, ...rest }: InputProps) {

  const inputRef = useRef<any>(null);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        placeholder={placeholder}
        {...rest}
      />
    </Container>
  );
}