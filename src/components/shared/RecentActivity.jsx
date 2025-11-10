import React from 'react';

const RecentActivity = ({ activities, role }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Crop</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
              {role === 'farmer' ? 'Buyer' : 'Seller'}
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-4 px-4 font-medium text-gray-900">{activity.crop}</td>
              <td className="py-4 px-4 text-gray-600">
                {role === 'farmer' ? activity.buyer : activity.seller}
              </td>
              <td className="py-4 px-4 font-semibold text-gray-900">{activity.amount}</td>
              <td className="py-4 px-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'Completed' || activity.status === 'Won'
                    ? 'bg-green-100 text-green-700'
                    : activity.status === 'Pending' || activity.status === 'Active'
                    ? 'bg-yellow-100 text-yellow-700'
                    : activity.status === 'In Transit'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {activity.status}
                </span>
              </td>
              <td className="py-4 px-4 text-gray-500 text-sm">{activity.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentActivity;