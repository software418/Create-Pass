import { Outlet, Link } from 'react-router-dom';
import { Navbar } from '../ui/organisms/Navbar';
import { Sidebar, SidebarItem } from '../ui/organisms/Sidebar';
import {  Package, LogOut } from 'lucide-react';
import { Button } from '../ui/atoms/Button';
import { Avatar } from '../ui/atoms/Avatar';

export const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar>
        <div className="flex flex-1 items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-primary">Create pass</div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <LogOut className="h-4 w-4" />
            </Button>
            <Avatar fallback="US" />
          </div>
        </div>
      </Navbar>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar>
          <Link to="/create-pass"><SidebarItem icon={Package} label="Create Pass" /></Link>
        </Sidebar>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
