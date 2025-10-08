export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

export const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    status: 'active',
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Manager',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
    status: 'active',
    joinDate: '2023-02-20'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    status: 'inactive',
    joinDate: '2023-03-10'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    status: 'active',
    joinDate: '2023-04-05'
  },
  {
    id: 5,
    name: 'Tom Brown',
    email: 'tom.brown@example.com',
    role: 'Developer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    status: 'active',
    joinDate: '2023-05-12'
  }
];

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  totalRevenue: number;
}

export const dashboardStats: DashboardStats = {
  totalUsers: 1250,
  activeUsers: 1180,
  newUsersThisMonth: 95,
  totalRevenue: 45230
};
