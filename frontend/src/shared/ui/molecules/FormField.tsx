// import React from 'react';
// import { Label } from '../atoms/Label';
// import { cn } from '../../utils/cn';

// interface FormFieldProps {
//   label: string;
//   error?: string;
//   className?: string;
//   htmlFor?:string;
//   children: React.ReactNode;
// }

// export const FormField: React.FC<FormFieldProps> = ({ label, error, className, children }) => {
//   return (
//     <div className={cn('space-y-2', className)}>
//       <Label className={error ? 'text-destructive' : ''}>{label}</Label>
//       {children}
//       {error && <p className="text-sm font-medium text-destructive">{error}</p>}
//     </div>
//   );
// };

import React from 'react';
import { Label } from '../atoms/Label';
import { cn } from '../../utils/cn';

interface FormFieldProps {
  label: string;
  error?: string;
  className?: string;
  htmlFor?: string; // This interface property is perfect!
  children: React.ReactNode;
}

// FIX: Added 'htmlFor' to the destructured arguments list below
export const FormField: React.FC<FormFieldProps> = ({ label, error, className, htmlFor, children }) => {
  return (
    <div className={cn('space-y-2', className)}>
      {/* FIX: Pass 'htmlFor' directly into your Label atom component */}
      <Label htmlFor={htmlFor} className={error ? 'text-destructive' : ''}>
        {label}
      </Label>
      {children}
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
};
