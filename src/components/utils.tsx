import { ConfigProp } from '../types';

export const requiredTag = () => <span className='text-red-500'>*</span>;

export const configLabel = ({ id, attr, type, value, onChange }: ConfigProp) => (
  <div key={`${id}`} className='col-span-2 flex gap-2 items-end'>
    <label className='text-black'>{attr}:</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className='p-1 pb-0 border-b outline-none w-full'
    />
  </div>
);

export const configPlaceholder = configLabel

export const configRequired = ({ id, attr, type, checked, onChange }: ConfigProp) => (
  <div key={`${id}`} className='col-span-1 flex gap-x-3'>
    <label className='text-black'>{attr}:</label>
    <input
      type={type}
      value={attr}
      checked={checked}
      onChange={onChange}
      className='p-1 pb-0 border-b outline-none'
    />
  </div>
);

export const configInfo = ({ id, attr, type, value, onChange }: ConfigProp) => (
  <div key={`${id}`} className='col-span-4 flex gap-2 items-end'>
    <label className='text-black'>{attr}:</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className='p-1 pb-0 border-b outline-none w-full'
    />
  </div>
);

export const configureUnderline = ({ id, attr, type, checked, onChange }: ConfigProp) => (
  <div key={`${id}`} className='col-span-1 flex gap-x-3'>
    <label className='text-black'>{attr}:</label>
    <input
      type={type}
      value={attr}
      checked={checked}
      onChange={onChange}
      className='p-1 pb-0 border-b outline-none'
    />
  </div>
);

export const configureTitle = ({ id, attr, type, value, onChange }: ConfigProp) => (
  <div key={`${id}`} className='col-span-4 flex gap-2 items-end'>
    <label className='text-black'>{attr}:</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className='p-1 pb-0 border-b outline-none w-full'
    />
  </div>
);

export const configureAlign = ({ id, attr, type, checked, onChange }: ConfigProp) => (
  <div key={`${id}`} className='col-span-1 flex gap-x-3'>
    <label className='text-black'>{attr}:</label>
    <input
      type={type}
      value={attr}
      checked={checked}
      onChange={onChange}
      className='p-1 pb-0 border-b outline-none'
    />
  </div>
);
