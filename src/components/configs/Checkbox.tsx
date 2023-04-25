import { useAtom } from 'jotai';
import { capitalize } from '../../helpers';
import { formAtom, updateFieldAtom } from '../../state/atoms';

type Prop = { fieldId: string; name: string };
type Name = 'required' | 'underline' | 'align';

export const Checkbox: React.FC<Prop> = ({ fieldId: id, name }) => {
  const [form] = useAtom(formAtom);
  const [, updateField] = useAtom(updateFieldAtom);
  const field = form[id];

  let checked = field?.[name as Name];
  let alignName: string;
  let alignDir = ''

  if (name.includes('align')) {
    alignDir = name.slice(6);
    alignName = 'align';
    checked = field?.align === alignDir;
  }

  return (
    <div key={id} className='col-span-1 flex gap-x-3'>
      <label className='text-black'>{capitalize(name)}:</label>
      <input
        type='checkbox'
        value={alignDir}
        checked={checked as boolean}
        onChange={(e) =>
          updateField({
            id,
            key: alignName ?? name,
            value: alignDir ? e.target.value : e.target.checked,
          })
        }
        className='p-1 pb-0 border-b outline-none'
      />
    </div>
  );
};
