import { Metadata } from 'next';

import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { BASE_URL } from '@/constants/data';

export const metadata: Metadata = {
  title: 'History',
  description: ''
};

export default function TaskPage({ historyComplaints }: any) {
  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Historial de reclamos
            </h2>
            <p className="text-muted-foreground">Listado del historial</p>
          </div>
        </div>
        {historyComplaints ? (
          <DataTable data={historyComplaints} columns={columns} />
        ) : (
          ''
        )}
      </div>
    </>
  );
}
