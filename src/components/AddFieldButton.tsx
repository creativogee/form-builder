import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/20/solid';
import { classNames } from '../helpers';

type Prop = {
  callback: (option: string) => void;
};

const AddFieldButton: React.FC<Prop> = ({ callback }) => {
  const fieldOptions = ['Heading', 'Text input', 'Text area', 'Scale'];

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div className='text-white'>
        <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-blue-600 hover:bg-blue-800 px-3 py-2 text-sm font-semibold shadow-sm'>
          Add Field
          <PlusIcon className='-mr-1 h-5 w-5' aria-hidden='true' />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            {fieldOptions.map((opt, optIdx) => (
              <Menu.Item key={optIdx}>
                {({ active }) => (
                  <a
                    href='#'
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    )}
                    onClick={() => callback(opt)}
                  >
                    {opt}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AddFieldButton;
