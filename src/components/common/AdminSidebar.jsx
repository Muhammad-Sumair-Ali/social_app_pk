import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white">
      <nav className="p-4">
        <ul>
          <li className="mb-4">
            <Link href="/admin/dashboard">
              <a className="hover:text-blue-400">Dashboard</a>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/users">
              <a className="hover:text-blue-400">Manage Users</a>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/settings">
              <a className="hover:text-blue-400">Settings</a>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
