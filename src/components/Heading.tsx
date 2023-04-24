import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { CheckedProp, FieldProp } from '../types';
import Config from './Config';
import { classNames } from '../helpers';

const Heading: React.FC<FieldProp> = ({ id, callback: removeField }) => {
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<CheckedProp>({
    Underline: true,
    Align: 'Left'
  });
  const configOptions = ['Title', 'Underline', 'Align Left', 'Align Center', 'Align Right'];

  const openConfig = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(!open);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (value.includes('Align')) {
      const [key, val] = value.split(' ')
      setChecked((oldChecked) => ({ ...oldChecked, [key]: val }));
    }
    setChecked((oldChecked) => ({ ...oldChecked, [value]: checked }));
  };

  return (
    <div className='text-neutral-500'>
      <div className='relative'>
        <h1
          className={classNames(
            'text-black text-2xl font-bold border border-dashed h-12 leading-[2.8rem]',
            checked.Underline ? 'underline' : '',
            checked.Align === 'Right' ? 'text-right' : '',
            checked.Align === 'Center' ? 'text-center' : ''
          )}
        >
          {title}
        </h1>
        <div className='absolute top-0 -right-4 flex flex-col h-full gap-y-2 group'>
          <button
            onClick={openConfig}
            className='h-5 w-5 border bg-slate-200 shadow-md invisible group-hover:visible'
          >
            {open ? (
              <ChevronUpIcon className='h-5 w-5 text-gray-700' />
            ) : (
              <ChevronDownIcon className='h-5 w-5 text-gray-700' />
            )}
          </button>
          <button
            onClick={() => removeField(id)}
            className='h-5 w-5 border bg-white invisible group-hover:visible'
          >
            <XMarkIcon className='h-4 w-4 text-rose-600' />
          </button>
        </div>
      </div>
      <Config
        options={configOptions}
        open={open}
        setOpen={setOpen}
        title={title}
        handleTitleChange={handleTitleChange}
        checked={checked}
        handleCheckedChange={handleCheckedChange}
      />
    </div>
  );
};

export default Heading;
