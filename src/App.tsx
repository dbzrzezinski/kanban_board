import "./App.css";
import Layout from "./components/Layout/Layout";
import { ApiMockResponse as BoardDataMock } from "./ApiMockData/dummyData";
import { useEffect, useState } from "react";
import { ChevronUpIcon, PlusIcon } from "@heroicons/react/24/outline";
import Lane from "./components/Lane/Lane";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Board, Item } from "./Types/KanbanBoard.types";

function App() {
  const [boardData, setBoardData] = useState<Board[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [showBoard, setShowBoard] = useState<boolean>(true);
  const [showAddTaskFormLane, setShowAddTaskFormLane] = useState<number>(-1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredBoardData, setFilteredBoardData] = useState<Board[]>();

  const STORAGE_KEY_BOARD_DATA = "kanban_board";

  // random Users
  const users = [
    { name: "James", id: 20 },
    { name: "Alexander", id: 50 },
    { name: "Wiliam", id: 60 },
    { name: "Benjamin", id: 80 },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(STORAGE_KEY_BOARD_DATA);

      if (item !== null && Array.isArray(item) && item.length === 0) {
        setBoardData(JSON.parse(item));
        setFilteredBoardData(JSON.parse(item));
      } else {
        // Fill board with Mock data if the board is empty or local storage was cleared
        //TODO: Remove this before deployment
        setBoardData(BoardDataMock);
        setFilteredBoardData(BoardDataMock);
      }
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (typeof boardData !== "undefined") {
      localStorage.setItem(STORAGE_KEY_BOARD_DATA, JSON.stringify(boardData));
    }
  }, [boardData]);

  const handleInputChange = (inputValue: string) => {
    const boardCopy = boardData.slice();

    if (inputValue === "") {
      console.log("Board: ", boardCopy);
      setFilteredBoardData(boardCopy);
      return;
    }

    console.log("continue");

    const results = boardCopy?.filter((boardLane) => {
      boardLane.items = boardLane.items.filter((item) => {
        if (item.title.toLowerCase().includes(inputValue.toLowerCase())) {
          return item;
        }
      });

      return boardLane;
    });

    setFilteredBoardData(results);
  };

  const onDragEnd = (dragDropElement: DropResult) => {
    if (!dragDropElement.destination) {
      return;
    }

    let newBoardData = [...boardData];
    let { droppableId, index } = dragDropElement.source;

    if (newBoardData) {
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
      setFilteredBoardData(newBoardData);
    }
  };

  const handleSubmitNewTask = (item: Item) => {
    const newBoardData = [...boardData];

    if (showAddTaskFormLane && newBoardData) {
      newBoardData[showAddTaskFormLane].items.push(item);
      setBoardData(newBoardData);
      setFilteredBoardData(newBoardData);
    }
  };

  return (
    <div className="min-w-full min-h-screen ">
      {isReady && (
        <Layout setSearchValue={handleInputChange}>
          <div className="p-10">
            <div className="flex flex-initial justify-between flex-col lg:flex-row">
              <div className="flex items-center justify-center md:justify-start">
                <h4 className="text-3xl font-bold text-gray-600">
                  Kanban Board
                </h4>
                <button onClick={() => setShowBoard(!showBoard)}>
                  <ChevronUpIcon
                    className={`${
                      showBoard ? "rotate-180" : ""
                    } w-7 h-7 text-gray-600 rounded-full bg-white p-2 ml-2 mt-1 hover:cursor-pointer`}
                  />
                </button>
              </div>

              <div className="mt-8 lg:mt-0 ">
                <ul className="flex space-x-3 justify-center md:justify-start">
                  {/* Show some random ids/user portraits */}
                  {users.map((person, index) => (
                    <li key={person.id}>
                      <img
                        src={`https://randomuser.me/api/portraits/men/${person.id}.jpg`}
                        width="32"
                        height="32"
                        className="object-cover rounded-full"
                        title={person.name}
                      />
                    </li>
                  ))}
                  <li>
                    <button className="border border-dashed rounded-full flex items-center justify-center w-8 h-8 border-gray-500 hover:text-gray-700 hover:border-solid hover:shadow-md opacity-70 hover:opacity-100">
                      <PlusIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
              {showBoard && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 my-5">
                  {filteredBoardData &&
                    filteredBoardData.map((laneData: Board, index: number) => (
                      <Droppable droppableId={index.toString()} key={index}>
                        {(provided) => (
                          <div>
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              <Lane
                                laneData={laneData}
                                droppableProvider={provided}
                                showAddTaskFormLane={showAddTaskFormLane}
                                submitNewTask={handleSubmitNewTask}
                                setShowAddTaskFormLane={setShowAddTaskFormLane}
                                laneIndex={index}
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
