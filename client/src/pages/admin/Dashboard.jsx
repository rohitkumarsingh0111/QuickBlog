import React, { useState, useEffect } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })


  const { axios} = useAppContext()

  const fetchDashboard = async ()=> {
    try {
      const { data } = await axios.get('/api/admin/dashboard')
      data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() =>{
    fetchDashboard()
  },[]) 

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light'>Blogs
            </p>
          </div>
        </div>
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_2} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.comments}</p>
            <p className='text-gray-400 font-light'>Comments
            </p>
          </div>
        </div>
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_3} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
            <p className='text-gray-400 font-light'>Drafts
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>

        <div className="relative max-w-5xl mt-4 overflow-x-auto bg-white rounded-lg shadow">
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
      {dashboardData.recentBlogs.map((blog, index) => (
        <BlogTableItem
          key={blog._id}
          blog={blog}
          index={index + 1}
          fetchBlogs={fetchDashboard}
        />
      ))}
    </tbody>
  </table>
</div>


      </div>
    </div>
  )
}

export default Dashboard