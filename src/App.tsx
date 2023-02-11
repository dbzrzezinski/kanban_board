import "./App.css";

import Layout from "./components/Layout/Layout";

import { ApiMockResponse as BoardData } from "./ApiMockData/dummyData";

import { useEffect, useState } from "react";

import {
  ChevronDownIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  ChatBubbleLeftEllipsisIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";

import Lane from "./components/Lane/Lane";

function App() {
  const [boardData, setBoardData] = useState(BoardData);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsReady(true);
    }
  }, []);

  return (
    <div className="min-w-full min-h-screen  h-screen overflow-hidden bg-blue-100">
      {isReady && (
        <Layout>
          <div className="p-10">
            <div className="flex flex-initial justify-between">
              <div className="flex items-center">
                <h4 className="text-4xl font-bold text-gray-600">
                  Kanban Board
                </h4>
                <ChevronDownIcon className="w-8 h-8 text-gray-600 rounded-full bg-white p-2 ml-2 mt-1 hover:cursor-pointer shadow-xl" />
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

            <div className="grid grid-cols-4 gap-5 my-5">
              {boardData.map((laneData, index) => (
                <Lane laneData={laneData} key={index} />
              ))}
            </div>
          </div>
        </Layout>
      )}
    </div>
  );
}

export default App;
