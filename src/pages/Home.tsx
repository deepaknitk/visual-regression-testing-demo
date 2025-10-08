const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200" data-testid="build-status">
              ✅ New Commit on Top of Approved Build
            </span>
          </div>
          <h1 className="text-5xl font-extrabold text-gradient bg-gradient-to-r from-purple-900 to-pink-600 bg-clip-text text-transparent sm:text-6xl" data-testid="home-title">
            🚀 Welcome to Visual Regression Demo v2.1
          </h1>
          <p className="mt-6 text-2xl text-purple-600 font-medium" data-testid="home-description">
            ✨ Experience the power of automated visual testing with Percy, Cypress, and React
            <br />
            <span className="text-lg text-indigo-600 font-normal">This build includes incremental changes after approval</span>
          </p>
          <div className="mt-8">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200" data-testid="cta-button">
              🎯 Start Testing Now
            </button>
          </div>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow-lg rounded-xl border-l-4 border-purple-500 hover:shadow-xl transition-shadow duration-300" data-testid="feature-card-1">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-lg font-bold">👥</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        User Management
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        Manage user accounts and roles
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-lg rounded-xl border-l-4 border-emerald-500 hover:shadow-xl transition-shadow duration-300" data-testid="feature-card-2">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-lg font-bold">📊</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Dashboard Analytics
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        Real-time data and insights
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-lg rounded-xl border-l-4 border-indigo-500 hover:shadow-xl transition-shadow duration-300" data-testid="feature-card-3">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-lg font-bold">🎯</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Visual Testing
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        Automated screenshot comparison
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white shadow overflow-hidden sm:rounded-md" data-testid="info-section">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Testing Capabilities
              </h3>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                Incremental Build Test
              </span>
            </div>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                This application demonstrates various UI components and states for comprehensive visual regression testing.
              </p>
              <p className="mt-2 text-sm text-orange-600 font-medium">
                🔍 Testing: Will Percy compare against Master baseline or approved build?
              </p>
            </div>
            <div className="mt-5">
              <div className="rounded-md bg-purple-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-purple-800">
                      🎯 Features included:  
                    </h3>
                    <div className="mt-2 text-sm text-purple-700">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>User management interface</li>
                        <li>Dashboard with statistics</li>
                        <li>Profile management</li>
                        <li>Settings configuration</li>
                        <li>Responsive design elements</li>
                      </ul>
                    </div>
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

export default Home;
