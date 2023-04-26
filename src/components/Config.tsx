import { useEffect, useRef } from 'react';
import { Checkbox } from './elements/Checkbox';
import { Input } from './elements/Input';

type Prop = {
  id: string;
  options: string[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Config: React.FC<Prop> = ({ id, options, open, setOpen }) => {
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
        const name = attr.toLowerCase();

        switch (name) {
          case 'label':
          case 'placeholder':
            return (
              <div key={idx} className='col-span-2'>
                <Input fieldId={id} name={name} />
              </div>
            );
          case 'info':
          case 'title':
          case 'question':
            return (
              <div key={idx} className='col-span-4'>
                <Input fieldId={id} name={name} />
              </div>
            );
          case 'minimum':
          case 'maximum':
            return (
              <div key={idx} className='col-span-1'>
                <Input fieldId={id} name={name} />
              </div>
            );
          case 'underline':
          case 'required':
          case 'align left':
          case 'align right':
          case 'align center':
            return (
              <div key={idx} className='col-span-1'>
                <Checkbox fieldId={id} name={name} />
              </div>
            );
          default:
            break;
        }
      })}
    </div>
  ) : null;
};

export default Config;
