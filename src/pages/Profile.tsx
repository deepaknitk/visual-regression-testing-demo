import { users } from '../data/users';

const Profile = () => {
  // Using the first user as current user for demo
  const currentUser = users[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900" data-testid="profile-title">
            Profile Settings
          </h1>
          <p className="mt-2 text-sm text-gray-700" data-testid="profile-description">
            Manage your personal information and account settings.
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg" data-testid="profile-card">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <img 
                  className="h-20 w-20 rounded-full" 
                  src={currentUser.avatar} 
                  alt={currentUser.name}
                  data-testid="profile-avatar"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-gray-900" data-testid="profile-name">
                  {currentUser.name}
                </h2>
                <p className="text-sm text-gray-500" data-testid="profile-role">
                  {currentUser.role}
                </p>
                <p className="text-sm text-gray-500" data-testid="profile-email">
                  {currentUser.email}
                </p>
              </div>
              <div>
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  data-testid="edit-profile-button"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg" data-testid="profile-form-container">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
              Personal Information
            </h3>
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

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  data-testid="save-profile-button"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  data-testid="cancel-profile-button"
                >
                  Cancel
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
