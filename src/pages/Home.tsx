const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-purple-900 sm:text-5xl" data-testid="home-title">
            🚀 Welcome to Visual Regression Demo
          </h1>
          <p className="mt-4 text-xl text-purple-600" data-testid="home-description">
            Experience the power of automated visual testing with Percy, Cypress, and React
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg" data-testid="feature-card-1">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">1</span>
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

            <div className="bg-white overflow-hidden shadow rounded-lg" data-testid="feature-card-2">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">2</span>
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

            <div className="bg-white overflow-hidden shadow rounded-lg" data-testid="feature-card-3">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">3</span>
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
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Testing Capabilities
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                This application demonstrates various UI components and states for comprehensive visual regression testing.
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
