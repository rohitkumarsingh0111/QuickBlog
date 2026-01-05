import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';

const ListBlog = () => {

  const [blogs, setBlogs] = useState([]);
  const  fetchBlogs = async () => {
    setBlogs(blog_data)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm: pl-16 bg-blue-50/50'>
      <h1 className='pl-4'>All Blogs</h1>
           <div className="relative h-4/5 mt-4 max-w-5xl mt-4 overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-600">
          
          {/* TABLE HEADER */}
          <thead className="text-xs uppercase bg-gray-50 text-gray-500 border-b">
            <tr>
              <th className="px-6 py-4 w-16 text-center">#</th>
      
              <th className="px-6 py-4">Blog Title</th>
              <th className="px-6 py-4 hidden md:table-cell">Date</th>
              <th className="px-6 py-4 hidden md:table-cell">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
      
          {/* TABLE BODY */}
          <tbody>
            {blogs.map((blog, index) => (
              <BlogTableItem
                key={blog._id}
                blog={blog}
                index={index + 1}
                fetchBlogs={fetchBlogs}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListBlog