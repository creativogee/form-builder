import {
  ChevronDownIcon,
  ChevronUpIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { CheckedProp, FieldProp } from '../types';
import { requiredTag } from './utils';
import Config from './Config';

const TextArea: React.FC<FieldProp> = ({ id, callback: removeField }) => {
  const [label, setLabel] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [info, setInfo] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<CheckedProp>({
    Required: false,
  });

  const configOptions = ['Label', 'Placeholder', 'Info', 'Required'];

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceholder(e.target.value);
  };

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo(e.target.value);
  };

  const openConfig = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(!open);
  };

  const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setChecked((oldChecked) => ({ ...oldChecked, [value]: checked }));
  };

  return (
    <div className='text-neutral-500'>
      <div className='flex flex-col gap-y-2'>
        {label && (
          <label className='text-black font-semibold'>
            {label}
            {checked.Required && requiredTag()}:
          </label>
        )}
        <div className='relative'>
          <textarea
            className='border-gray-300 focus:border-blue-500 block h-12 w-full rounded border p-3 shadow-sm focus:outline-0 focus:ring-0 disabled:opacity-50'
            placeholder={placeholder}
          />
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
        {info && (
          <div className='flex gap-x-1.5 items-center'>
            <InformationCircleIcon className='h-4 w-4 text-blue-300' />
            <p className='text-sm text-neutral-500 italic'>{info}</p>
          </div>
        )}
      </div>
      <Config
        options={configOptions}
        open={open}
        setOpen={setOpen}
        label={label}
        handleLabelChange={handleLabelChange}
        placeholder={placeholder}
        handlePlaceholderChange={handlePlaceholderChange}
        info={info}
        handleInfoChange={handleInfoChange}
        checked={checked}
        handleCheckedChange={handleCheckedChange}
      />
    </div>
  );
};

export default TextArea;
