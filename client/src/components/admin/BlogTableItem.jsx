import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({blog, fetchBlogs, index}) => {

    const { title, createdAt} = blog;
    const BlogDate = new Date(createdAt)


    const { axios } = useAppContext();

    const deleteBlog = async ()=> {
      const confirm = window.confirm('Are you sure want to delete this blog ?')
      if(!confirm)return;
      try {
        const { data } = await axios.post('/api/blog/delete', {id: blog._id})
        if(data.success) {
          toast.success(data.message)
          await fetchBlogs()
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const togglePublish = async () => {
      try {
       const { data } = await axios.post('/api/blog/toggle-publish', {id: blog._id})
       if(data.success) {
          toast.success(data.message)
          await fetchBlogs()
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

  return (
  <tr className="border-b hover:bg-gray-50 transition">
    
    {/* SERIAL NUMBER */}
    <td className="px-6 py-4 w-16 text-center font-medium text-gray-700">
      {index}
    </td>

    {/* BLOG TITLE */}
    <td className="px-6 py-4 text-gray-800">
      {title}
    </td>

    {/* DATE */}
    <td className="px-6 py-4 hidden md:table-cell">
      {new Date(blog.createdAt).toDateString()}
    </td>

    {/* STATUS */}
    <td className="px-6 py-4 hidden md:table-cell">
      <span
        className={`font-semibold ${
          blog.isPublished ? "text-green-600" : "text-orange-600"
        }`}
      >
        {blog.isPublished ? "Published" : "Unpublished"}
      </span>
    </td>

    {/* ACTIONS */}
    <td className="px-6 py-4">
      <div className="flex items-center justify-center gap-3 text-xs">
        <button onClick= {togglePublish} className="border px-3 py-1 rounded hover:bg-gray-100 transition">
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>

        <img
          src={assets.cross_icon}
          alt="Delete"
          className="w-8 hover:scale-110 cursor-pointer transition" onClick={deleteBlog}
        />
      </div>
    </td>

  </tr>
);

}

export default BlogTableItem