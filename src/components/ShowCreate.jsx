import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import PostCard from "./PostCard";

const ShowCreate = ({ setShowCreate }) => {
  const [showPosts, setshowPosts] = useState(false);
  const [posts, setposts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [postData, setpostData] = useState({
    title: "",
    file: "",
    description: "",
    date: Date.now(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setposts((prev) =>
        prev.map((post) =>
          post.date === editId ? { ...postData, date: editId } : post,
        ),
      );

      setIsEditing(false);
      setEditId(null);
    } else {
      const newPost = {
        ...postData,
        date: Date.now(),
      };

      setposts((prev) => [...prev, newPost]);
    }

    setpostData({
      title: "",
      file: "",
      description: "",
      date: Date.now(),
      edit: false,
    });
    // console.log(posts);
    // setshowPosts(true);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setpostData((prev) => {
      return { ...prev, file: URL.createObjectURL(file) };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setpostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (post) => {
    setpostData(post);
    setIsEditing(true);
    setEditId(post.date);
    setshowPosts(false);
  };

  const handleDelete = (id) => {
    setposts((prev) => prev.filter((post) => post.date !== id));
  };

  useEffect(() => {}, [posts]);

  return showPosts ? (
    <div className="h-full w-full flex items-start justify-start flex-wrap gap-5">
      {posts.map((post) => (
        <PostCard
          key={post.date}
          file={post.file}
          title={post.title}
          description={post.description}
          onEdit={() => handleEdit(post)}
          onDelete={() => handleDelete(post.date)}
          edit={post.edit}
        />
      ))}

      <div
        onClick={() => setShowCreate((prev) => !prev)}
        className="flex items-center justify-end gap-1 cursor-pointer group"
      >
        <IoIosArrowRoundBack className="text-white text-[2rem] group-hover:-translate-x-1 transition" />
        <span className="text-zinc-300 group-hover:text-white transition">
          Back
        </span>
      </div>
    </div>
  ) : (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className=" w-[40%] bg-zinc-800 border border-zinc-700 p-8 rounded-xl flex flex-col gap-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-white font-semibold">Create a Post</h1>

        <div
          onClick={() => setShowCreate((prev) => !prev)}
          className="flex items-center gap-1 cursor-pointer group"
        >
          <IoIosArrowRoundBack className="text-white text-[2rem] group-hover:-translate-x-1 transition" />
          <span className="text-zinc-300 group-hover:text-white transition">
            Back
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-sm text-zinc-400">Upload File or Image</label>
        <input
          onChange={handleFile}
          required
          type="file"
          className="bg-zinc-700 text-zinc-300 p-2 rounded-md cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-zinc-600 file:text-white hover:file:bg-zinc-500"
        />

        <label className="text-sm text-zinc-400">Post Title</label>
        <input
          onChange={handleChange}
          name="title"
          value={postData.title}
          required
          type="text"
          placeholder="Enter title..."
          className="bg-zinc-700 text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-zinc-400"
        />

        <label className="text-sm text-zinc-400">Description</label>
        <textarea
          onChange={handleChange}
          name="description"
          value={postData.description}
          required
          placeholder="Write something..."
          className="bg-zinc-700 text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-zinc-400 resize-none h-24"
        />

        <div className="flex gap-6">
          <button
            type="submit"
            className="bg-blue-600 cursor-pointer w-[50%] hover:bg-blue-500 text-white py-2 rounded-md mt-2 transition"
          >
            {isEditing ? "Update Post" : "Create Post"}
          </button>

          <button
            type="button"
            onClick={() => {
              setshowPosts((prev) => !prev);
            }}
            className="bg-blue-600 cursor-pointer w-[50%] hover:bg-blue-500 text-white py-2 rounded-md mt-2 transition"
          >
            Show All Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default ShowCreate;
