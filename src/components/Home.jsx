import React from "react";

const Home = ({setShowCreate}) => {
    return (
        <div>
      <h1 className="text-6xl text-center">
        CURD PROJECT <br /> Create, Update, Read, Delete Your post
      </h1>

      <div className="btns mt-10 flex justify-center gap-7 items-center">
        <button
          onClick={() => {
              setShowCreate(prev => !prev);
          }}
          className="bg-zinc-700 py-2 px-4 rounded-md cursor-pointer"
        >
          Create Post
        </button>
        {/* <button className="bg-zinc-700 py-2 px-4 rounded-md cursor-pointer">Edit Post</button> */}
      </div>
    </div>
  );
};

export default Home;
