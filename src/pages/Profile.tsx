import { users } from '../data/users';

const Profile = () => {
  // Using the first user as current user for demo
  const currentUser = users[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-medium mb-4">
            👤 User Profile Hub
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent" data-testid="profile-title">
            My Profile Dashboard - update from commit 2
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto" data-testid="profile-description">
            🌟 Customize your personal information and account preferences with style
          </p>
        </div>

        <div className="bg-white shadow-2xl overflow-hidden sm:rounded-2xl border-t-4 border-emerald-500" data-testid="profile-card">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img 
                    className="h-24 w-24 rounded-full border-4 border-white shadow-lg" 
                    src={currentUser.avatar} 
                    alt={currentUser.name}
                    data-testid="profile-avatar"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-400 border-2 border-white rounded-full w-6 h-6 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-white" data-testid="profile-name">
                  {currentUser.name}
                </h2>
                <div className="flex items-center mt-1">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white bg-opacity-20 text-white mr-2" data-testid="profile-role">
                    💼 {currentUser.role}
                  </span>
                  <span className="text-emerald-100 text-sm" data-testid="profile-email">
                    📧 {currentUser.email}
                  </span>
                </div>
              </div>
              <div>
                <button 
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-lg text-sm font-semibold backdrop-blur-sm border border-white border-opacity-30 transition-all duration-200 hover:scale-105"
                  data-testid="edit-profile-button"
                >
                  ✏️ Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="mt-8 bg-white shadow-xl overflow-hidden sm:rounded-xl border-l-4 border-teal-500" data-testid="profile-form-container">
          <div className="px-6 py-7 sm:p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-lg">📝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Personal Information - update from commit 1  
              </h3>
            </div>
            <form className="space-y-6" data-testid="profile-form">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    defaultValue="John"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    data-testid="input-first-name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    defaultValue="Doe"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    data-testid="input-last-name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={currentUser.email}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  data-testid="input-email"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  defaultValue={currentUser.role}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  data-testid="select-role"
                >
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Developer</option>
                  <option>Designer</option>
                </select>
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  placeholder="Tell us about yourself..."
                  defaultValue="Experienced system administrator with a passion for automation and cloud technologies."
                  data-testid="textarea-bio"
                />
              </div>

              <div className="flex justify-center items-center space-x-6 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-lg p-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  data-testid="save-profile-button"
                >
                  💾 Save Changes
                </button>
                <button
                  type="button"
                  className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white px-8 py-3 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  data-testid="cancel-profile-button"
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Account Settings */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg" data-testid="account-settings">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
              Account Settings
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between" data-testid="notification-setting">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Receive email updates about your account activity.</p>
                </div>
                <button
                  type="button"
                  className="bg-blue-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  data-testid="notification-toggle"
                >
                  <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                </button>
              </div>

              <div className="flex items-center justify-between" data-testid="security-setting">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                </div>
                <button
                  type="button"
                  className="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  data-testid="2fa-toggle"
                >
                  <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6" data-testid="danger-zone">
                <h4 className="text-sm font-medium text-red-900">Danger Zone</h4>
                <p className="text-sm text-gray-500 mt-1">These actions cannot be undone.</p>
                <div className="mt-4 flex space-x-4">
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    data-testid="delete-account-button"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
