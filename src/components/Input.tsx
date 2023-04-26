import {
  ChevronDownIcon,
  ChevronUpIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { requiredTag } from './utils';
import Config from './Config';
import { useAtom } from 'jotai';
import { formAtom, removeFieldAtom } from '../state/atoms';

const Input: React.FC<{id: string}> = ({ id }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [form] = useAtom(formAtom);
  const [, removeField] = useAtom(removeFieldAtom)

  const configOptions = ['label', 'placeholder', 'info', 'required'];
  const {label, required, placeholder, info, type} = form[id]

  const openConfig = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <>
      <div className='flex flex-col gap-y-2'>
        {label && (
          <label className='text-black font-semibold'>
            {label}
            {required && requiredTag()}:
          </label>
        )}
        <div className='relative'>
          <input
            type={type}
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
      <Config id={id} options={configOptions} open={open} setOpen={setOpen} />
    </>
  );
};

export default Input;
