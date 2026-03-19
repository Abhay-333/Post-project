import { useState } from "react";
import Home from "./components/Home";
import ShowCreate from "./components/ShowCreate";

function App() {
  const [showCreate, setShowCreate] = useState(false);
  
  return (
    <div className="bg-zinc-900 h-full w-full text-white p-8 flex items-center justify-center flex-col gap-5  ">
      {showCreate ? (
        <ShowCreate setShowCreate={setShowCreate}/>
      ) : (
        <Home setShowCreate={setShowCreate} />
      )}
    </div>
  );
}

export default App;
