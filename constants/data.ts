import { fetchData } from '@/lib/actions';
import { NavItem } from '@/types';
import { ChartData } from '@/types/types-mine';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

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
    href: '/dashboard/reclamos',
    icon: 'page',
    label: 'products'
  },
  {
    title: 'Pendientes',
    href: '/dashboard/pendientes',
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
        title: 'Reclamos',
        href: '/dashboard/reclamos',
        icon: 'page',
        label: 'products'
      },
      {
        title: 'Pendientes',
        href: '/dashboard/pendientes',
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
export const URLNODE = 'http://localhost:5001';
