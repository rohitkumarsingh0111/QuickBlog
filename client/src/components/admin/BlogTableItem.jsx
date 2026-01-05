import React from 'react'
import { assets } from '../../assets/assets';

const BlogTableItem = ({blog, fetchBlogs, index}) => {

    const { title, createdAt} = blog;
    const BlogDate = new Date(createdAt)

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
        <button className="border px-3 py-1 rounded hover:bg-gray-100 transition">
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>

        <img
          src={assets.cross_icon}
          alt="Delete"
          className="w-7 cursor-pointer hover:scale-110 transition"
        />
      </div>
    </td>

  </tr>
);

}

export default BlogTableItem