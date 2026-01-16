import React, { useEffect, useRef, useState } from 'react';
import { assets, blogCategories } from '../../assets/assets';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddBlog = () => {
  const { axios } = useAppContext();

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  /* -------------------- INIT QUILL -------------------- */
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write your blog content here...',
      });
    }
  }, []);

  /* -------------------- SUBMIT HANDLER -------------------- */
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error('Please upload a thumbnail');
      return;
    }

    try {
      setIsAdding(true);

      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);

      const { data } = await axios.post(
        '/api/blog/add', // 🔁 make sure this matches backend
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data.success) {
        toast.success(data.message);

        // reset form
        setImage(null);
        setTitle('');
        setSubTitle('');
        setCategory('Startup');
        setIsPublished(false);
        quillRef.current.root.innerHTML = '';
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blur-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        {/* Thumbnail */}
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="thumbnail"
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            id="image"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        {/* Title */}
        <p className="mt-4">Blog title</p>
        <input
          type="text"
          required
          placeholder="Type title"
          className="w-full max-w-lg mt-2 p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Subtitle */}
        <p className="mt-4">Sub title</p>
        <input
          type="text"
          required
          placeholder="Type subtitle"
          className="w-full max-w-lg mt-2 p-2 border rounded"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />

        {/* Description */}
        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg min-h-[200px] pt-2">
          <div ref={editorRef} />
        </div>

        {/* Category */}
        <p className="mt-4">Blog category</p>
        <select
          className="mt-2 px-3 py-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Publish */}
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="scale-125 cursor-pointer"
          />
          <p>Publish Now</p>
        </div>

        {/* Submit */}
        <button
          disabled={isAdding}
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white rounded text-sm disabled:opacity-60"
        >
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
