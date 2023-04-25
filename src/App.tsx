import AddFieldButton from './components/AddFieldButton';
import Input from './components/Input';
import TextArea from './components/TextArea';
import Heading from './components/Heading';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import LikertScale from './components/Scale';
import { useAtom } from 'jotai';
import { formAtom, orderFieldAtom } from './state/atoms';


function App() {
  const [form] = useAtom(formAtom);
  const [, orderField] = useAtom(orderFieldAtom)
  const fields = Object.keys(form);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination)  return;
    if (destination.index === source.index) return;

    orderField({source, destination})
  };

  return (
    <div className='bg-neutral-200'>
      <div className='max-w-3xl mx-auto border p-10 h-screen bg-white'>
        <div className='flex'>
          <div className='flex-1'></div>
          <div className='shadow-lg mb-10'>
            <AddFieldButton />
          </div>
        </div>
        <form>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='form-fields'>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div className='flex flex-col gap-3'>
                    {fields.map((key, index) =>
                      form[key].elem === 'text input' ? (
                        <Draggable key={key} draggableId={key} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Input id={key} />
                            </div>
                          )}
                        </Draggable>
                      ) : form[key].elem === 'text area' ? (
                        <Draggable key={key} draggableId={key} index={index}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <TextArea id={key} />
                            </div>
                          )}
                        </Draggable>
                      ) : form[key].elem === 'heading' ? (
                        <Draggable key={key} draggableId={key} index={index}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <Heading id={key} />
                            </div>
                          )}
                        </Draggable>
                      ) : form[key].elem === 'scale' ? (
                        <Draggable key={key} draggableId={key} index={index}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <LikertScale id={key} />
                            </div>
                          )}
                        </Draggable>
                      ) : null,
                    )}
                  </div>
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
