import React, { useCallback } from 'react';
import { Container } from './styles';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  type?: string;
  label?: string;
  value?: string;
  styleLabel?: React.CSSProperties;
  placeholder?: string;
  error?: boolean;
  success?: boolean;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type = "text", label, value, styleLabel, placeholder, onChange, ...rest }) => {
  const addFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.parentElement?.classList.add('focus');
  }, []);

  const removeFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.parentElement?.classList.remove('focus');
  }, []);

  return (
    <Container>
      {label && <span style={styleLabel}>{label}</span>}
      <div className="borderInput success">
        <input type={type} value={value} placeholder={placeholder} onChange={onChange} onFocus={addFocus} onBlur={removeFocus} {...rest} />
      </div>
    </Container>
  );
};

export default Input;