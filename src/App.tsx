/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */

import "./global.css";
import HeaderSection from "./components/header-section";
import TasksContent from "./components/tasks-section";
import TaskContextProvider from "./contexts/task-context";

function App() {
  return (
    <main className="flex flex-col items-center w-screen h-screen py-10 antialiased bg-zinc-800">
      <div className="flex flex-col w-full gap-5 px-10 md:max-w-[768px]">
        <TaskContextProvider>
          <HeaderSection />

          <TasksContent />
        </TaskContextProvider>
      </div>
    </main>
  );
}

export default App;
