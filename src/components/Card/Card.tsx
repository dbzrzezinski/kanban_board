import { FC } from "react";
import {
  PlusIcon,
  ChatBubbleLeftEllipsisIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import CardLabel from "../CardLabel/CardLabel";
import { Item } from "../../Types/KanbanBoard.types";
import { Draggable } from "@hello-pangea/dnd";

type ItemProps = {
  cardItem: Item;
  index: number;
};

const Card: FC<ItemProps> = ({ cardItem, index }) => {
  const rotate = "rotate(-5deg)";

  const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,
    opacity: isDragging ? ".7" : "1",

    // transform: isDragging ? "scale(1.5)" : "",
    // styles we need to apply on draggables
  });

  return (
    <Draggable
      index={index}
      draggableId={cardItem.id.toString()}
      key={cardItem.id}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <div className="bg-white rounded-md p-3 m-3 shadow-md select-none">
            <CardLabel priority={cardItem.priority} />
            <h5 className="text-md my-3 text-lg leading-6">{cardItem.title}</h5>
            <div className="flex justify-between">
              <div className="flex space-x-2 items-center">
                <span className="flex space-x-1 items-center text-gray-500 text-xs">
                  <ChatBubbleLeftEllipsisIcon className="w-4 h-4 " />
                  <span>{cardItem.chat}</span>
                </span>
                <span className="flex space-x-1 items-center text-gray-500 text-xs">
                  <PaperClipIcon className="w-4 h-4 " />
                  <span>{cardItem.attachment}</span>
                </span>
              </div>

              <ul className="flex space-x-3">
                {cardItem.assignees.map((assignee) => (
                  <li key={assignee.avatar}>
                    <img
                      src={assignee.avatar}
                      width="36"
                      height="36"
                      className="object-cover rounded-full "
                    />
                  </li>
                ))}

                <li>
                  <button
                    className="border border-dashed flex items-center w-9 h-9 border-gray-500 justify-center
rounded-full"
                  >
                    <PlusIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
