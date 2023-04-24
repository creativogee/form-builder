import { useEffect, useRef } from 'react';
import { CheckedProp } from '../types';
import {
  configInfo,
  configLabel,
  configPlaceholder,
  configRequired,
  configureAlign,
  configureTitle,
  configureUnderline,
} from './utils';

type Prop = {
  options: string[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  label?: string;
  handleLabelChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  handlePlaceholderChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  info?: string;
  handleInfoChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: CheckedProp;
  handleCheckedChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title?: string;
  handleTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Config: React.FC<Prop> = ({
  options,
  open,
  setOpen,
  label,
  handleLabelChange,
  placeholder,
  handlePlaceholderChange,
  info,
  handleInfoChange,
  checked,
  handleCheckedChange,
  title,
  handleTitleChange,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add event listener to handle clicks outside of the component
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Remove event listener on unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setOpen]);

  return open ? (
    <div ref={ref} className='grid gap-3 grid-cols-4 border p-3 shadow-md mt-2'>
      {options.map((attr, idx) => {
        switch (attr) {
          case 'Label':
            return configLabel({
              id: idx,
              attr,
              type: 'text',
              value: label,
              onChange: handleLabelChange,
            });
          case 'Placeholder':
            return configPlaceholder({
              id: idx,
              attr,
              type: 'text',
              value: placeholder,
              onChange: handlePlaceholderChange,
            });
          case 'Info':
            return configInfo({
              id: idx,
              attr,
              type: 'text',
              value: info,
              onChange: handleInfoChange,
            });
          case 'Required':
            return configRequired({
              id: idx,
              attr,
              type: 'checkbox',
              checked: checked?.[attr],
              onChange: handleCheckedChange,
            });
          case 'Title':
            return configureTitle({
              id: idx,
              attr,
              type: 'text',
              value: title,
              onChange: handleTitleChange,
            });
          case 'Underline':
            return configureUnderline({
              id: idx,
              attr,
              type: 'checkbox',
              checked: checked?.[attr],
              onChange: handleCheckedChange,
            });
          case 'Align Left':
          case 'Align Right':
          case 'Align Center':
            return configureAlign({
              id: idx,
              attr,
              type: 'checkbox',
              checked: checked?.[attr.split(' ')[0] as keyof typeof checked] === attr.split(' ')[1],
              onChange: handleCheckedChange,
            });
          default:
            break;
        }
      })}
    </div>
  ) : null;
};

export default Config;
