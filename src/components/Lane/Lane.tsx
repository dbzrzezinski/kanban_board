import React, { FC, ReactElement } from "react";

import { PlusIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import Card from "../Card/Card";

import { Board } from "../../Types/KanbanBoard.types";
import { DroppableProvided } from "@hello-pangea/dnd";

type LaneProps = {
  laneData: Board;
  droppableProvider: DroppableProvided;
};

const Lane: FC<LaneProps> = ({ laneData, droppableProvider }): ReactElement => {
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

      <button
        className="flex justify-center items-center my-3 space-x-2 text-gray-600 text-sm"
        onClick={() => {}}
      >
        <span>Add task</span>
        <PlusIcon className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
};

export default Lane;
