import { Getter, Setter, atom } from 'jotai';
import { Field } from '../types';
import { DraggableLocation } from 'react-beautiful-dnd';

export const formAtom = atom<Record<string, Field>>({});

export const removeFieldAtom = atom(null, async (get: Getter, set: Setter, id: string) => {
  console.log(id);
  const prevForm = get(formAtom);
  const newForm = { ...prevForm };
  delete newForm[id];
  set(formAtom, newForm);
});

export const orderFieldAtom = atom(
  null,
  async (
    get: Getter,
    _,
    { source, destination }: { source: DraggableLocation; destination: DraggableLocation },
  ) => {
    const prevForm = get(formAtom);
    const fields = Object.keys(prevForm);
    const sourceKey = fields[source.index] as string;
    const destinationKey = fields[destination.index] as string;

    [prevForm[sourceKey], prevForm[destinationKey]] = [
      prevForm[destinationKey],
      prevForm[sourceKey],
    ];
  },
);

export const updateFieldAtom = atom(
  null,
  async (
    get: Getter,
    set: Setter,
    { id, key, value }: { id: string; key: string; value: number | string | boolean },
  ) => {
    const prevForm = get(formAtom);
    const prevField = prevForm[id]
    const newField = {...prevField, [key]: value}
    const newForm = {...prevForm, [id]: newField}

    set(formAtom, newForm)
  },
);
