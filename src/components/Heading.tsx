import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import Config from './Config';
import { classNames } from '../helpers';
import { useAtom } from 'jotai';
import { formAtom, removeFieldAtom } from '../state/atoms';

const Heading: React.FC<{id: string}> = ({ id }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [form] = useAtom(formAtom);
  const [, removeField] = useAtom(removeFieldAtom)

  const configOptions = ['Title', 'Underline', 'Align Left', 'Align Center', 'Align Right'];
  const { align, underline, title} = form[id]

  const openConfig = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <div className='text-neutral-500'>
      <div className='relative'>
        <h1
          className={classNames(
            'text-black text-2xl font-bold h-12 leading-[2.8rem]',
            underline ? 'underline' : '',
            align === 'right' ? 'text-right' : '',
            align === 'center' ? 'text-center' : ''
          )}
        >
          {title}
        </h1>
        <div className='absolute top-0 -right-4 flex flex-col h-full gap-y-2 group'>
          <button
            onClick={openConfig}
            className='h-5 w-5 border bg-slate-200 shadow-md'
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
      <Config id={id} options={configOptions} open={open} setOpen={setOpen} />
    </div>
  );
};

export default Heading;
