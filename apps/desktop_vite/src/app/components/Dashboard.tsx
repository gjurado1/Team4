import { Outlet } from 'react-router';

export function Dashboard() {
  return (
    <div className="flex-1 overflow-auto">
      <Outlet />
    </div>
  );
}