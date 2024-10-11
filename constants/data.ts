import { fetchData } from '@/lib/fetchData';
import { NavItem } from '@/types';
import { ChartData, Complaint } from '@/types/types-mine';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const BASE_URL = 'http://localhost:5001';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Reclamo',
    href: '/dashboard/reclamo/new',
    icon: 'page',
    label: 'products'
  },
  {
    title: 'Pendientes',
    href: '/dashboard/reclamo',
    icon: 'pizza',
    label: 'employee'
  },
  {
    title: 'Cerrados',
    href: '/dashboard/cerrados',
    icon: 'history',
    label: 'Cerrados'
  },
  {
    title: 'Reportes',
    href: '/dashboard/reportes',
    icon: 'post',
    label: 'employee'
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: 'profile',
    label: 'profile'
  },
  {
    title: 'Kanban',
    href: '/dashboard/kanban',
    icon: 'kanban',
    label: 'kanban'
  },
  {
    title: 'Login',
    href: '/',
    icon: 'login',
    label: 'login'
  },
  {
    title: 'Avanzado',
    href: '/dashboard/settings',
    icon: 'settings',
    label: 'login'
  }
];

export const updateNavItemsWithPendingCount = async () => {
  try {
    const data: ChartData = await fetchData('complaints');

    const num = data.pendingComplaints.length;

    return [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: 'dashboard',
        label: 'Dashboard'
      },
      {
        title: 'Reclamo',
        href: '/dashboard/reclamo/new',
        icon: 'page',
        label: 'products'
      },
      {
        title: 'Pendientes',
        href: '/dashboard/reclamo',
        icon: 'pizza',
        label: 'employee',
        badge: num
      },
      {
        title: 'Cerrados',
        href: '/dashboard/cerrados',
        icon: 'history',
        label: 'Cerrados'
      },
      {
        title: 'Reportes',
        href: '/dashboard/reportes',
        icon: 'post',
        label: 'employee'
      },
      // {
      //   title: 'Profile',
      //   href: '/dashboard/profile',
      //   icon: 'profile',
      //   label: 'profile'
      // },
      {
        title: 'Products',
        href: '/dashboard/productos',
        icon: 'product',
        label: 'profile'
      },
      {
        title: 'Kanban',
        href: '/dashboard/kanban',
        icon: 'kanban',
        label: 'kanban'
      },
      {
        title: 'Login',
        href: '/',
        icon: 'login',
        label: 'login'
      },
      {
        title: 'Avanzado',
        href: '/dashboard/settings',
        icon: 'settings',
        label: 'login'
      }
    ];
  } catch (error) {
    console.error('Error fetching pending complaints count:', error);
    return []; // Return an empty array if error occurs
  }
};

const getTenantBaseUrl = () => {
  // Obtenemos el hostname actual
  const hostname =
    typeof window !== 'undefined' ? window.location.hostname : '';

  // Dividimos el hostname para obtener el subdominio
  const parts = hostname.split('.');

  // Suponiendo que el subdominio está en la primera parte
  const tenant = parts.length > 2 ? parts[0] : null; // Capturamos el subdominio

  // Aquí podrías tener una lógica más compleja para definir la URL
  // basada en el subdominio
  if (tenant) {
    return `https://${tenant}.webflow.com`;
  }

  // Valor por defecto para desarrollo
  return 'http://localhost:3000';
};

export const URL = 'http://localhost:3000';
