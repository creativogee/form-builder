import { useEffect, useRef } from 'react';
import { Section } from './configs/Section';
import { Checkbox } from './configs/Checkbox';
import { Paragraph } from './configs/Paragraph';
import { Count } from './configs/Count';

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
        const name = attr.toLowerCase()

        switch (name) {
          case 'label':
          case 'placeholder':
            return <Section key={idx} fieldId={id} name={name} />;
          case 'info':
          case 'title':
          case 'question':
            return <Paragraph key={idx} fieldId={id} name={name} />;
          case 'underline':
          case 'required':
          case 'align left':
          case 'align right':
          case 'align center':
            return <Checkbox key={idx} fieldId={id} name={name} />;
          case 'minimum':
          case 'maximum':
            return <Count  key={idx} fieldId={id} name={name} />
          default:
            break;
        }
      })}
    </div>
  ) : null;
};

export default Config;
