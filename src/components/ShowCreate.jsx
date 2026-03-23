import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import PostCard from "./PostCard";
import { useForm } from "react-hook-form";

const ShowCreate = ({ setShowCreate }) => {
  const [showPosts, setshowPosts] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [posts, setposts] = useState(() => {
    const stored = localStorage.getItem("posts");
    return stored ? JSON.parse(stored) : [];
  });

  const [editId, setEditId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { title: "", description: "", file: null },
    mode: "onChange",
  });

  console.log(posts);

  const handleFormSubmit = async (data) => {
    let image = null;
    if (data.file?.[0]) {
      image = await convertToBase64(data.file[0]);
    }
    if (isEditing) {
      setposts((prev) =>
        prev.map((post) =>
          post.date === editId
            ? {
                ...post,
                title: data.title,
                description: data.description,
                file: data.file?.[0]
                  ? URL.createObjectURL(data.file[0])
                  : post.file,
              }
            : post,
        ),
      );
    } else {
      const newPost = {
        title: data.title,
        description: data.description,
        file: URL.createObjectURL(data.file[0]),
        date: Date.now(),
      };
      setposts((prev) => [...prev, newPost]);
    }
    reset();
  };

  const handleEdit = (post) => {
    console.log(post);
    setshowPosts(false);
    setIsEditing(true);
    setEditId(post.date);

    reset({ title: post.title, description: post.description, file: null });
  };

  const handleDelete = (id) => {
    setposts((prev) => prev.filter((post) => post.date !== id));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

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
      onSubmit={handleSubmit(handleFormSubmit)}
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
          {...register("file", { required: "File is mandatory" })}
          type="file"
          className="bg-zinc-700 text-zinc-300 p-2 rounded-md cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-zinc-600 file:text-white hover:file:bg-zinc-500"
        />
        {errors.file && (
          <p className="text-red-600 text-sm">{errors.file.message}</p>
        )}

        <label className="text-sm text-zinc-400">Post Title</label>
        <input
          {...register("title", { required: "title is mandatory" })}
          name="title"
          type="text"
          placeholder="Enter title..."
          className="bg-zinc-700 text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-zinc-400"
        />
        {errors.title && (
          <p className="text-red-600 text-sm">{errors.title.message}</p>
        )}

        <label className="text-sm text-zinc-400">Description</label>
        <textarea
          {...register("description", {
            required: "description is required",
          })}
          name="description"
          placeholder="Write something..."
          className="bg-zinc-700 text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-zinc-400 resize-none h-24"
        />
        {errors.description && (
          <p className="text-red-600 text-sm">{errors.description.message}</p>
        )}

        <div className="flex gap-6">
          <button
            type="submit"
            className={`${isValid ? "bg-blue-600 cursor-pointer" : "bg-gray-600 cursor-not-allowed"} w-[50%] text-white py-2 rounded-md mt-2 transition`}
            disabled={!isValid}
            // onClick={handleEdit}
          >
            {isEditing ? "Edit Post" : "Create a Post"}
          </button>

          <button
            type="button"
            onClick={() => {
              setshowPosts((prev) => !prev);
            }}
            className="cursor-pointer bg-blue-600  w-[50%] hover:bg-blue-500 text-white py-2 rounded-md mt-2 transition"
          >
            Show All Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default ShowCreate;
