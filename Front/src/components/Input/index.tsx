import React, { useCallback, useState } from 'react';
import { Container } from './styles';
import { clsx } from 'clsx';
import type { FieldValues } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  type?: string;
  label?: string;
  value?: string;
  styleLabel?: React.CSSProperties;
  placeholder?: string;
  errors?: FieldValues;
  hidePassword?: boolean;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type = "text", label, value, styleLabel, placeholder, errors, hidePassword, onChange, ...rest }) => {
  const addFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.parentElement?.classList.add('focus');
  }, []);

  const removeFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.parentElement?.classList.remove('focus');
  }, []);

  const [hidePasswordType, setHidePasswordType] = useState('password');

  const changeHidePasswordType = useCallback(() => {
    setHidePasswordType(prev => prev === 'password' ? 'text' : 'password');
  }, []);

  return (
    <Container>
      {label && <span className='label' style={styleLabel}>{label}</span>}
      <div className={clsx('borderInput', errors && 'error')}>
        <input type={hidePassword ? hidePasswordType : type} value={value} placeholder={placeholder} onChange={onChange} onFocus={addFocus} onBlur={removeFocus} {...rest} />
        {hidePassword && (
          <button  type='button' className='hidePassword'>
            {hidePasswordType === 'password' ? <IoMdEyeOff size={20} onClick={changeHidePasswordType} /> : <IoMdEye size={20} />}
          </button>
        )}
      </div>
      {errors && <span className='errorLabel'>{errors.message}</span>}
    </Container>
  );
};

export default Input;