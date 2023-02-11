import "./App.css";
import Layout from "./components/Layout/Layout";
// import { ApiMockResponse as BoardData } from "./ApiMockData/dummyData";
import { useEffect, useState } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Lane from "./components/Lane/Lane";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

function App() {
  const [boardData, setBoardData] = useState();
  const [isReady, setIsReady] = useState(false);
  const [showBoard, setShowBoard] = useState(true);

  const STORAGE_KEY = "kanban_board";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(STORAGE_KEY);
      if (item !== null) {
        setBoardData(JSON.parse(item));
      }
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (typeof boardData !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(boardData));
    }
  }, [boardData]);

  const onDragEnd = (dragDropElement: DropResult) => {
    if (!dragDropElement.destination) return;

    let newBoardData = [...boardData];
    let { droppableId, index } = dragDropElement.source;

    const draggedItem = newBoardData[Number(droppableId)].items.splice(
      index,
      1
    );

    const destinationDropId = dragDropElement.destination.droppableId;
    const destinationIndex = dragDropElement.destination.index;

    newBoardData[parseInt(destinationDropId)].items.splice(
      destinationIndex,
      0,
      ...draggedItem
    );

    setBoardData(newBoardData);
  };

  return (
    <div className="min-w-full min-h-screen h-screen overflow-hidden bg-blue-100">
      {isReady && (
        <Layout>
          <div className="p-10">
            <div className="flex flex-initial justify-between">
              <div className="flex items-center">
                <h4 className="text-4xl font-bold text-gray-600">
                  Kanban Board
                </h4>
                <button onClick={() => setShowBoard(!showBoard)}>
                  <ChevronUpIcon
                    className={`${
                      showBoard ? "rotate-180" : ""
                    } w-8 h-8 text-gray-600 rounded-full bg-white p-2 ml-2 mt-1 hover:cursor-pointer`}
                  />
                </button>
              </div>

              <div>
                <ul className="flex space-x-3">
                  {/* Show some random ids/user portraits */}
                  {[20, 50, 60, 80].map((personID) => (
                    <li key={personID}>
                      <img
                        src={`https://randomuser.me/api/portraits/men/${personID}.jpg`}
                        width="36"
                        height="36"
                        className="object-cover rounded-full"
                      />
                    </li>
                  ))}
                  <li>
                    <button className="border border-dashed rounded-full flex items-center justify-center w-9 h-9 border-gray-500 hover:text-gray-700 hover:border-solid hover:border-gray-700 hover:shadow-md">
                      <PlusIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
              {showBoard && (
                <div className="grid grid-cols-4 gap-5 my-5">
                  {boardData.map((laneData, index) => (
                    <Droppable droppableId={index.toString()} key={index}>
                      {(provided, snapshot) => (
                        <div>
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            <Lane
                              laneData={laneData}
                              droppableProvider={provided}
                            />
                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ))}
                </div>
              )}
            </DragDropContext>
          </div>
        </Layout>
      )}
    </div>
  );
}

export default App;
