import { nanoid } from 'nanoid';
import { useState } from 'react';
import AddFieldButton from './components/AddFieldButton';
import Input from './components/TextInput';
import TextArea from './components/TextArea';
import Heading from './components/Heading';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import LikertScale from './components/Scale';

type FormFieldProps = {
  key: string;
  elem: 'input' | 'text-area' | 'heading' | 'scale';
  type?: 'text' | 'email' | 'password' | 'number';
  name?: string;
  placeholder?: string;
  info?: string;
};

function App() {
  const [fields, setFields] = useState<FormFieldProps[]>([]);

  console.log(fields)

  const addField = (option: string) => {
    switch (option.toLowerCase()) {
      case 'text input':
        setFields((oldFields) => [...oldFields, { key: nanoid(), elem: 'input', type: 'text' }]);
        break;
      case 'text area':
        setFields((oldFields) => [...oldFields, { key: nanoid(), elem: 'text-area' }]);
        break;
      case 'heading':
        setFields((oldFields) => [...oldFields, { key: nanoid(), elem: 'heading' }]);
        break;
      case 'scale':
        setFields((oldFields) => [...oldFields, { key: nanoid(), elem: 'scale' }]);
        break;
      default:
        break;
    }
  };

  const removeField = (key: string) => {
    const filteredFields = fields.filter((field) => field.key !== key);
    setFields(filteredFields);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    setFields((prevState) => {
      const newState = [...prevState];
      const [removed] = newState.splice(source.index, 1);
      newState.splice(destination.index, 0, removed);
      return newState;
    });
  };

  return (
    <div className='bg-neutral-200'>
      <div className='max-w-3xl mx-auto border p-10 h-screen bg-white'>
        <div className='flex'>
          <div className='flex-1'></div>
          <div className='shadow-lg mb-10'>
            <AddFieldButton callback={addField} />
          </div>
        </div>
        <form>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='form-fields'>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {fields.length > 0 ? (
                    <div className='flex flex-col gap-3'>
                      {fields.map((field, index) =>
                        field.elem === 'input' ? (
                          <Draggable key={field.key} draggableId={field.key} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Input id={field.key} type={field.type} callback={removeField} />
                              </div>
                            )}
                          </Draggable>
                        ) : field.elem === 'text-area' ? (
                          <Draggable key={field.key} draggableId={field.key} index={index}>
                            {(provided) => (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <TextArea id={field.key} callback={removeField} />
                              </div>
                            )}
                          </Draggable>
                        ) : field.elem === 'heading' ? (
                          <Draggable key={field.key} draggableId={field.key} index={index}>
                            {(provided) => (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <Heading id={field.key} callback={removeField} />
                              </div>
                            )}
                          </Draggable>
                        ) : field.elem === 'scale' ? (
                          <Draggable key={field.key} draggableId={field.key} index={index}>
                            {(provided) => (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <LikertScale id={field.key} callback={removeField} />
                              </div>
                            )}
                          </Draggable>
                        ) : null,
                      )}
                    </div>
                  ) : null}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </form>
      </div>
    </div>
  );
}

export default App;
