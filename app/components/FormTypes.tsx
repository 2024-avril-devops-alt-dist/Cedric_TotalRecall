
export interface FormProps {
    className?: string;
    onSubmit: (event: React.FormEvent) => void;
    children: React.ReactNode;
  }

export interface InputProps {
    id: string;
    required: boolean;
    name: string;
    placeHolder: string;
    label: string;
    className: string;
    type: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
export interface ButtonProps {
    type: "button" | "submit" | "reset";
    className?: string;
    title: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
   // children: React.ReactNode;
  }
  
  export interface SelectProps {
    id: string;
    name: string;
    label: string;
    className?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
  }
  