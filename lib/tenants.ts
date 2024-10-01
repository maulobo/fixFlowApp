interface Tenant {
  name: string;
  db: string;
}

const tenants: Record<string, Tenant> = {
  tenant1: { name: 'Tenant One', db: 'db1' },
  tenant2: { name: 'Tenant Two', db: 'db2' }
  // Agrega más inquilinos según sea necesario
};

export const getTenantFromSubdomain = (host: string): Tenant | null => {
  const subdomain = host.split('.')[0]; // Extrae el subdominio
  return tenants[subdomain] || null; // Retorna el tenant correspondiente o null
};
