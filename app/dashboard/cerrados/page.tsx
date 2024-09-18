import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import TaskPage from './history-page';
import { taskSchema } from './data/schema';
import { BASE_URL } from '@/constants/data';
import { z } from 'zod';
export type Complaint = z.infer<typeof taskSchema>;

// Elementos del breadcrumb
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'products', link: '/dashboard/products' }
];

// Función para obtener las tareas
const getTasks = async (): Promise<Complaint[]> => {
  const response = await fetch(`${BASE_URL}/get-history`);

  if (!response.ok) {
    throw new Error('Failed to fetch task history');
  }

  const data = await response.json();

  // Validar con zod
  if (!data.history) {
    throw new Error('No history data found in response');
  }

  try {
    return z.array(taskSchema).parse(data.history);
  } catch (error) {
    console.error('Validation error:', error);
    throw new Error('Invalid data structure');
  }
};

export default async function Page() {
  const historyComplaints: Complaint[] = await getTasks();

  return (
    <PageContainer>
      {historyComplaints.length ? (
        <TaskPage historyComplaints={historyComplaints} />
      ) : (
        <p>No task history available</p>
      )}
    </PageContainer>
  );
}
