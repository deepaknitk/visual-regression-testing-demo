// Environment configuration
export const getEnvironmentConfig = () => {
  const env = import.meta.env.VITE_ENVIRONMENT || 'cloud';
  
  const configs = {
    cloud: {
      name: 'Cloud Edition',
      theme: {
        primary: 'bg-blue-600',
        secondary: 'bg-blue-100',
        accent: 'text-blue-600'
      },
      features: {
        showCloudBanner: true,
        showAdvancedMetrics: true,
        showMultiTenant: true
      },
      branding: {
        logo: '☁️',
        title: 'Cloud Visual Test App',
        subtitle: 'Powered by Cloud Infrastructure'
      }
    },
    onprem: {
      name: 'On-Premises Edition',
      theme: {
        primary: 'bg-green-600',
        secondary: 'bg-green-100', 
        accent: 'text-green-600'
      },
      features: {
        showCloudBanner: false,
        showAdvancedMetrics: false,
        showMultiTenant: false
      },
      branding: {
        logo: '🏢',
        title: 'On-Prem Visual Test App',
        subtitle: 'Self-Hosted Solution'
      }
    }
  };

  return configs[env as keyof typeof configs] || configs.cloud;
};

export const isCloudEnvironment = () => {
  return (import.meta.env.VITE_ENVIRONMENT || 'cloud') === 'cloud';
};

export const isOnPremEnvironment = () => {
  return (import.meta.env.VITE_ENVIRONMENT || 'cloud') === 'onprem';
};
