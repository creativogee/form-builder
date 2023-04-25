import { useAtom } from 'jotai';
import { formAtom, updateFieldAtom } from '../../state/atoms';
import { capitalize } from '../../helpers';

type Prop = { fieldId: string; name: string };
type Name = 'label' | 'placeholder'

export const Section: React.FC<Prop> = ({ fieldId: id, name }) => {
  const [form] = useAtom(formAtom);
  const [, updateField] = useAtom(updateFieldAtom);
  const field = form[id];

  return (
    <div key={id} className='col-span-2 flex gap-2 items-end'>
      <label className='text-black'>{capitalize(name)}:</label>
      <input
        type='text'
        value={field?.[name as Name]}
        onChange={(e) => updateField({ id, key: name, value: e.target.value })}
        className='p-1 pb-0 border-b outline-none w-full'
      />
    </div>
  );
};
