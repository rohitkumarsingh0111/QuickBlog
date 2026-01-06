import React, { useEffect, useState } from "react";
import CommentTableItem from "../../components/admin/CommentTableItem";
import { comments_data } from "../../assets/assets";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  useEffect(() => {
    setComments(comments_data);
  }, []);

  return (
    <div className="flex-1 min-h-screen pt-6 px-6 sm:pt-12 sm:pl-16 bg-slate-50">
      {/* Header */}
      <div className="flex justify-between items-center max-w-4xl mb-6">
        <h1 className="text-xl font-semibold text-slate-800">
          Comments Management
        </h1>

        <div className="flex gap-3 bg-white p-1 rounded-full shadow-sm border">
          {["Approved", "Not Approved"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-1.5 text-xs rounded-full transition-all
              ${
                filter === item
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="relative max-w-4xl overflow-x-auto bg-white shadow-sm border rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Blog & Comment</th>
              <th className="px-6 py-4 text-left max-sm:hidden">Date</th>
              <th className="px-6 py-4 text-left max-sm:hidden">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {comments
              .filter((c) =>
                filter === "Approved" ? c.isApproved : !c.isApproved
              )
              .map((comment) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  setComments={setComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comment;
