import { nanoid } from 'nanoid';
import { useState } from 'react';
import AddFieldButton from './components/AddFieldButton';
import Input from './components/TextInput';
import TextArea from './components/TextArea';
import Heading from './components/Heading';

type FormFieldProps = {
  key: string;
  elem: 'input' | 'text-area' | 'h1';
  type?: 'text' | 'email' | 'password' | 'number';
  name?: string;
  placeholder?: string;
  info?: string;
};

function App() {
  const [fields, setFields] = useState<FormFieldProps[]>([]);

  const addField = (option: string) => {
    switch (option.toLowerCase()) {
      case 'text-input':
        setFields((oldFields) => [...oldFields, { key: nanoid(), elem: 'input', type: 'text' }]);
        break;
      case 'text-area':
        setFields((oldFields) => [...oldFields, { key: nanoid(), elem: 'text-area' }]);
        break;
      case 'heading':
        setFields((oldFields) => [...oldFields, { key: nanoid(), elem: 'h1' }]);
        break;
      default:
        break;
    }
  };

  const removeField = (key: string) => {
    const filteredFields = fields.filter((field) => field.key !== key);
    setFields(filteredFields);
  };

  return (
    <div className='max-w-3xl mx-auto mt-10'>
      <div className='flex'>
        <div className='flex-1'></div>
        <div className='shadow-lg mb-10'>
          <AddFieldButton callback={addField} />
        </div>
      </div>
      <div className=''>
        {fields.length > 0 ? (
          <form action='' className='flex flex-col gap-3'>
            {fields.map((field) =>
              field.elem === 'input' ? (
                <Input key={field.key} id={field.key} type={field.type} callback={removeField} />
              ) : field.elem === 'text-area' ? (
                <TextArea key={field.key} id={field.key} callback={removeField} />
              ) : field.elem === 'h1' ? (
                <Heading key={field.key} id={field.key} callback={removeField} />
              ) : null,
            )}
          </form>
        ) : null}
      </div>
    </div>
  );
}

export default App;
