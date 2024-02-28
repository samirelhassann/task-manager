/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */

import "./global.css";
import TaskCard from "./components/task-card";

function App() {
  return (
    <main className="flex flex-col items-center w-screen h-screen py-10 antialiased bg-zinc-800">
      <div className="flex flex-col w-full gap-5 px-10 lg:w-2/5 lg:px-0">
        <header className="flex flex-col ">
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <h1 className="text-2xl text-purple-500 font-inter">
                Task Manager
              </h1>
              <h2 className="mt-1 text-base text-zinc-500">
                Control and monitor tasks
              </h2>
            </div>
            <button
              type="button"
              className="px-4 py-1 btn btn-primary border-[1px] rounded-lg text-zinc-500 border-zinc-500 w-fit h-fit self-end text-sm font-semibold"
            >
              Reset
            </button>
          </div>
          <hr className="mt-2 border-zinc-700" />
        </header>

        <section className="flex flex-col gap-5">
          <TaskCard title="Preparar documentação" time="01:10:23" />
        </section>
      </div>
    </main>
  );
}

export default App;
