import React from "react";

const PostCard = ({ file, title, description, onEdit, onDelete, edit }) => {
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden w-72 hover:scale-105 transition flex flex-col justify-between">

      <div className="h-40 w-full bg-zinc-700">
        {file ? (
          <img
            src={file}
            alt="post"
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-400">
            No Image
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-white text-lg font-semibold">
          {title || "Untitled"}
        </h2>

        <p className="text-zinc-400 text-sm line-clamp-3">
          {description || "No description available"}
        </p>
      </div>

      <div className="px-4 pb-4 flex justify-between">
        <button
          onClick={onEdit}
          className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-5 py-2 cursor-pointer rounded-md transition"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className="bg-red-600 hover:bg-red-500 text-white text-sm px-5 py-2 cursor-pointer rounded-md transition"
        >
          Delete
        </button>
      </div>

    </div>
  );
};

export default PostCard;