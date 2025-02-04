// components/Form.js
"use client";
import React  from 'react';
import '../css/Menu.css';

import { InputProps, ButtonProps, SelectProps, FormProps } from './FormTypes';

//----------------------------------- FORM -----------------------------------//
const Form: React.FC<FormProps> = ({ className, onSubmit, children }) => {
    return (
      <form className={className} onSubmit={onSubmit}>
        {children}
      </form>
    );
  };

//----------------------------------- INPUT -----------------------------------//
const Input: React.FC<InputProps> = ({ id, required, name, placeHolder, label, className, type, value, onChange }) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          id={id}
          className={className}
          type={type}
          value={value}
          placeholder={placeHolder}
          required={required}
          onChange={onChange}
        />
      </div>
    );
  };
  
//----------------------------------- BUTTON -----------------------------------//
const Button: React.FC<ButtonProps> = ({ type, className, onClick, title }) => {
    return (
      <button type={type} className={className} onClick={onClick}>
        {title}
      </button>
    );
  };
  
//----------------------------------- SELECT -----------------------------------//
  const Select: React.FC<SelectProps> = ({ id, name, label, className, value, onChange, options }) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
          id={id}
          name={name}
          className={className}
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  export { Form, Input, Button, Select };