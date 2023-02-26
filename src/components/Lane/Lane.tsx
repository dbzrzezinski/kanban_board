import React, { FC, ReactElement, useState } from "react";
import { PlusIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Card from "../Card/Card";
import { generateUUID } from "../../Helper/Util";
import CardLabel from "../CardLabel/CardLabel";
import { Board, Item } from "../../Types/KanbanBoard.types";
import { DroppableProvided } from "@hello-pangea/dnd";

type LaneProps = {
  laneData: Board;
  droppableProvider: DroppableProvided;
  showAddTaskFormLane: number;
  submitNewTask: (item: Item) => void;
  setShowAddTaskFormLane?: (form: number) => void;
  laneIndex: number;
};

const Lane: FC<LaneProps> = ({
  laneData,
  droppableProvider,
  showAddTaskFormLane,
  setShowAddTaskFormLane,
  submitNewTask,
  laneIndex,
}): ReactElement => {
  const [priority, setPriority] = useState(0);

  const handleKeypress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
    laneIndex: number
  ) => {
    if (event.code === "Escape") {
      setShowAddTaskFormLane!(-1);
    }

    const value = (event.target as HTMLTextAreaElement).value;
    if (event.code === "Enter" && value.trim() !== "") {
      const newItem = {
        id: generateUUID(),
        priority: priority,
        title: value,
        chat: 0,
        attachment: 0,
        assignees: [],
      };
      submitNewTask!(newItem);
      setPriority(0);
      setShowAddTaskFormLane!(-1);
    }
  };
  return (
    <div className="bg-gray-100 rounded-md shadow-md flex flex-col relative overflow-hidden">
      <span className="w-full h-1 bg-gradient-to-r from-sky-700 to-sky-200 absolute inset-x-0 top-0"></span>
      <h4 className="p-3 flex justify-between items-center">
        <div className="text-2xl text-gray-600">
          {laneData.name}
          <span className="text-gray-500 text-sm ml-2">
            ({laneData.items.length})
          </span>
        </div>

        <button>
          <EllipsisVerticalIcon className="w-6 h-6" />
        </button>
      </h4>

      <div
        className="overflow-y-auto overflow-x-hidden h-auto"
        style={{ maxHeight: "calc(100vh - 290px)" }}
      >
        {laneData.items.map((item, index) => (
          <Card cardItem={item} key={index} index={index} />
        ))}
        {droppableProvider.placeholder}
      </div>

      {showAddTaskFormLane === laneIndex ? (
        <div className="p-3">
          <textarea
            className="border-gray-300 rounded w-full"
            rows={3}
            placeholder="task description"
            onKeyDown={(e) => handleKeypress(e, laneIndex)}
          ></textarea>
          <div
            onClick={() => setPriority(priority >= 2 ? 0 : priority + 1)}
            className="hover:cursor-pointer"
          >
            <CardLabel priority={priority} />
          </div>
        </div>
      ) : (
        <button
          className="flex justify-center items-center my-3 space-x-2 text-gray-600 text-sm"
          onClick={() => {
            setShowAddTaskFormLane!(laneIndex);
          }}
        >
          <span>Add task</span>
          <PlusIcon className="w-4 h-4 text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default Lane;
