import React, { useCallback } from 'react';
import { Container } from './styles';
import { clsx } from 'clsx';
import type { FieldValues } from 'react-hook-form';

interface TextAreaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  value?: string;
  styleLabel?: React.CSSProperties;
  placeholder?: string;
  rows: number;
  errors?: FieldValues;
  onChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({  label, value, styleLabel, rows, placeholder, errors, onChange, ...rest }) => {
  const addFocus = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.currentTarget.parentElement?.classList.add('focus');
  }, []);

  const removeFocus = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.currentTarget.parentElement?.classList.remove('focus');
  }, []);

  return (
    <Container>
      {label && <span className='label' style={styleLabel}>{label}</span>}
      <div className={clsx('borderInput', errors && 'error')}>
        <textarea rows={rows} value={value} placeholder={placeholder} onChange={onChange} onFocus={addFocus} onBlur={removeFocus} {...rest} />
      </div>
      {errors && <span className='errorLabel'>{errors.message}</span>}
    </Container>
  );
};

export default TextArea;