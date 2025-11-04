import { dashboardStats, users } from '../data/users';

const Dashboard = () => {
  const chartData = [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 150 },
    { month: 'Mar', users: 180 },
    { month: 'Apr', users: 220 },
    { month: 'May', users: 280 },
    { month: 'Jun', users: 320 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900" data-testid="dashboard-title">
            Dashboard - {(import.meta.env.VITE_ENVIRONMENT || 'cloud').toUpperCase()} Environment
          </h1>
          <p className="mt-2 text-sm text-gray-700" data-testid="dashboard-description">
            Overview of your {(import.meta.env.VITE_ENVIRONMENT || 'cloud').toUpperCase()} application metrics and user activity.
          </p>
          <p className="mt-1 text-xs text-gray-500 current-time">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg" data-testid="stat-total-users">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">👥</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                    <dd className="text-2xl font-bold text-gray-900">{dashboardStats.totalUsers.toLocaleString()}</dd>
                    <dd className="text-sm text-green-600">+12% from last month</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg" data-testid="stat-active-users">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">✅</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                    <dd className="text-2xl font-bold text-gray-900 user-count">{dashboardStats.activeUsers.toLocaleString()}</dd>
                    <dd className="text-sm text-green-600">+8% from last month</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg" data-testid="stat-new-users">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">🆕</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">New This Month</dt>
                    <dd className="text-2xl font-bold text-gray-900">{dashboardStats.newUsersThisMonth}</dd>
                    <dd className="text-sm text-green-600">+15% from last month</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg" data-testid="stat-revenue">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">💰</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Revenue</dt>
                    <dd className="text-2xl font-bold text-gray-900">${dashboardStats.totalRevenue.toLocaleString()}</dd>
                    <dd className="text-sm text-green-600">+22% from last month</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart Visualization */}
          <div className="bg-white overflow-hidden shadow rounded-lg" data-testid="chart-container">
            <div className="p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                User Growth Trend - {(import.meta.env.VITE_ENVIRONMENT || 'cloud').toUpperCase()} Analytics
              </h3>
              <div className="space-y-3">
                {chartData.map((data, index) => (
                  <div key={data.month} className="flex items-center" data-testid={`chart-bar-${index}`}>
                    <div className="w-12 text-sm text-gray-500">{data.month}</div>
                    <div className="flex-1 ml-4">
                      <div className="bg-gray-200 rounded-full h-4 relative">
                        <div 
                          className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                          style={{ width: `${(data.users / 320) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-12 text-right text-sm font-medium text-gray-900">
                      {data.users}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white overflow-hidden shadow rounded-lg" data-testid="recent-activity">
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {users.slice(0, 5).map((user, index) => (
                  <div key={user.id} className="flex items-center space-x-3" data-testid={`activity-item-${index}`}>
                    <div className="flex-shrink-0">
                      <img 
                        className="h-8 w-8 rounded-full" 
                        src={user.avatar} 
                        alt={user.name}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Updated profile • <span className="timestamp">{Math.floor(Math.random() * 60) + 1}m ago</span>
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-8 bg-white overflow-hidden shadow rounded-lg" data-testid="performance-metrics">
          <div className="p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Performance Metrics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center" data-testid="metric-response-time">
                <div className="text-3xl font-bold text-blue-600">1.2s</div>
                <div className="text-sm text-gray-500">Avg Response Time</div>
                <div className="mt-2">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
              <div className="text-center" data-testid="metric-uptime">
                <div className="text-3xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-gray-500">Uptime</div>
                <div className="mt-2">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '99%' }}></div>
                  </div>
                </div>
              </div>
              <div className="text-center" data-testid="metric-satisfaction">
                <div className="text-3xl font-bold text-purple-600">4.8</div>
                <div className="text-sm text-gray-500">User Satisfaction</div>
                <div className="mt-2">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
