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

const LikertScale: React.FC<FieldProp> = ({ id, callback: removeField }) => {
  const [question, setQuestion] = useState('');
  const [info, setInfo] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [minimum, setMinimum] = useState<string>('')
  const [maximum, setMaximum] = useState<string>('')
  const [checked, setChecked] = useState<CheckedProp>({
    Required: false,
  });
  const configOptions = ['Question', 'Info', 'Required', 'Minimum', 'Maximum'];
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo(e.target.value);
  };

  const handleMinimumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinimum(e.target.value);
  };

  const handleMaximumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaximum(e.target.value);
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
      <div className='flex flex-col gap-y-2 pt-5'>
        <div className='relative'>
          <div className='flex gap-x-5 items-center'>
            <div className='w-full h-10 border-b'>
              {question && (
                <p className='text-black'>
                  {question}?{checked.Required && requiredTag()}:
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
      <Config
        options={configOptions}
        open={open}
        setOpen={setOpen}
        info={info}
        handleInfoChange={handleInfoChange}
        checked={checked}
        handleCheckedChange={handleCheckedChange}
        question={question}
        handleQuestionChange={handleQuestionChange}
        minimum={minimum}
        handleMinimumChange={handleMinimumChange}
        maximum={maximum}
        handleMaximumChange={handleMaximumChange}
      />
    </div>
  );
};

export default LikertScale;
