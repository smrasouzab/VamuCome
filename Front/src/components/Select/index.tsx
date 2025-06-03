import React, { useCallback } from 'react';
import { Container } from './styles';
import { clsx } from 'clsx';
import type { FieldValues } from 'react-hook-form';

interface SelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  type?: string;
  label?: string;
  value?: string;
  labels: string[];
  values: string[];
  styleLabel?: React.CSSProperties;
  placeholder?: string;
  errors?: FieldValues;
  notNull?: boolean;
  onChange?: (e: React.FormEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ label, value, styleLabel, placeholder, values, labels, errors, notNull, onChange, ...rest }) => {
  const addFocus = useCallback((e: React.FocusEvent<HTMLSelectElement>) => {
    e.currentTarget.parentElement?.classList.add('focus');
  }, []);

  const removeFocus = useCallback((e: React.FocusEvent<HTMLSelectElement>) => {
    e.currentTarget.parentElement?.classList.remove('focus');
  }, []);

  return (
    <Container>
      {label && <span className='label' style={styleLabel}>{label}</span>}
      <div className={clsx('borderInput', errors && 'error')}>
        <select value={value} onFocus={addFocus} onBlur={removeFocus} onChange={onChange} {...rest}>
          {!notNull && <option value=''>{placeholder ? placeholder : 'Selecionar'}</option>}
          {labels.map((label, index) => (
            <option key={index} value={values[index]}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {errors && <span className='errorLabel'>{errors.message}</span>}
    </Container>
  );
};

export default Select;