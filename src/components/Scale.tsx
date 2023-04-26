import {
  ChevronDownIcon,
  ChevronUpIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { requiredTag } from './utils';
import Config from './Config';
import { formAtom, removeFieldAtom } from '../state/atoms';
import { useAtom } from 'jotai';

const LikertScale: React.FC<{id: string}> = ({ id }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [form] = useAtom(formAtom);
  const [, removeField] = useAtom(removeFieldAtom)

  const openConfig = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(!open);
  };
  const configOptions = ['question', 'info', 'required', 'minimum', 'maximum'];
  const {required, info, question, minimum, maximum} = form[id]

  return (
    <>
      <div className='flex flex-col gap-y-2 pt-5'>
        <div className='relative'>
          <div className='flex gap-x-5 items-center'>
            <div className='w-full h-10 border-b'>
              {question && (
                <p className='text-black'>
                  {question}?{required && requiredTag()}:
                </p>
              )}
            </div>
            <input
              type='number'
              className='border-gray-300 text-center focus:border-blue-500 block h-10 w-24 border p-3 shadow-sm focus:outline-0 focus:ring-0 disabled:opacity-50'
              placeholder='-'
              min={!minimum ? 0 : minimum}
              max={!maximum ? 100: maximum}
            />
          </div>
          <div className='absolute top-0 -right-4 flex flex-col h-full group'>
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

export default LikertScale;
