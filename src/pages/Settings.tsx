const Settings = () => {
  const themes = [
    { id: 'light', name: 'Light', description: 'Clean and bright interface' },
    { id: 'dark', name: 'Dark', description: 'Easy on the eyes' },
    { id: 'system', name: 'System', description: 'Follow system preference' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium mb-4">
            Configuration Center from
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent" data-testid="settings-title">
            Advanced Settings - update from commit 1
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto" data-testid="settings-description">
            🎨 Personalize your experience with our comprehensive configuration options
          </p>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white shadow-xl overflow-hidden sm:rounded-xl mb-8 border-l-4 border-purple-500" data-testid="appearance-settings">
          <div className="px-6 py-7 sm:p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-lg">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Visual Appearance - update from commit 1
              </h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-900">Theme - update from commit 1</label>
                <p className="text-sm text-gray-500 mb-4">Choose your preferred color scheme.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {themes.map((theme, index) => (
                    <div 
                      key={theme.id} 
                      className="relative border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                      data-testid={`theme-option-${index}`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          value={theme.id}
                          defaultChecked={theme.id === 'light'}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          data-testid={`theme-radio-${theme.id}`}
                        />
                        <div className="ml-3">
                          <label className="block text-sm font-medium text-gray-900">
                            {theme.name}
                          </label>
                          <p className="text-sm text-gray-500">{theme.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div data-testid="font-size-setting">
                <label htmlFor="fontSize" className="block text-sm font-medium text-gray-900">
                  Font Size
                </label>
                <p className="text-sm text-gray-500 mb-2">Adjust the text size throughout the application.</p>
                <select
                  id="fontSize"
                  name="fontSize"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  defaultValue="medium"
                  data-testid="font-size-select"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="extra-large">Extra Large</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Localization Settings */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8" data-testid="localization-settings">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
              Localization
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-900">
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  defaultValue="en"
                  data-testid="language-select"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-900">
                  Time Zone
                </label>
                <select
                  id="timezone"
                  name="timezone"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  defaultValue="utc"
                  data-testid="timezone-select"
                >
                  <option value="utc">UTC (Coordinated Universal Time)</option>
                  <option value="est">EST (Eastern Standard Time)</option>
                  <option value="pst">PST (Pacific Standard Time)</option>
                  <option value="gmt">GMT (Greenwich Mean Time)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8" data-testid="notification-settings">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
              Notifications
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between" data-testid="email-notifications">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
                <button
                  type="button"
                  className="bg-blue-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  data-testid="email-toggle"
                >
                  <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                </button>
              </div>

              <div className="flex items-center justify-between" data-testid="push-notifications">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Push Notifications</h4>
                  <p className="text-sm text-gray-500">Receive browser notifications</p>
                </div>
                <button
                  type="button"
                  className="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  data-testid="push-toggle"
                >
                  <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                </button>
              </div>

              <div className="flex items-center justify-between" data-testid="sms-notifications">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">SMS Notifications</h4>
                  <p className="text-sm text-gray-500">Receive text message alerts</p>
                </div>
                <button
                  type="button"
                  className="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  data-testid="sms-toggle"
                >
                  <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8" data-testid="privacy-settings">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
              Privacy & Security
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between" data-testid="analytics-setting">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Analytics & Performance</h4>
                  <p className="text-sm text-gray-500">Help improve our services by sharing usage data</p>
                </div>
                <button
                  type="button"
                  className="bg-blue-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  data-testid="analytics-toggle"
                >
                  <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                </button>
              </div>

              <div className="flex items-center justify-between" data-testid="profile-visibility">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Profile Visibility</h4>
                  <p className="text-sm text-gray-500">Make your profile visible to other users</p>
                </div>
                <button
                  type="button"
                  className="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  data-testid="visibility-toggle"
                >
                  <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 bg-white rounded-xl shadow-lg p-6" data-testid="settings-actions">
          <button
            type="button"
            className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white px-8 py-3 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            data-testid="reset-settings-button"
          >
            🔄 Reset to Defaults
          </button>
          <button
            type="button"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            data-testid="save-settings-button"
          >
            💾 Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
