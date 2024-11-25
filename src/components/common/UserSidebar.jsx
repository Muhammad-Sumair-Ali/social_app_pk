import Link from 'next/link';

export default function UserSidebar() {
  return (
    <aside className="w-64 bg-blue-600 text-white">
      <nav className="p-4">
        <ul>
          <li className="mb-4">
            <Link href="/user/home">
              <b className="hover:text-gray-300">Home</b>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/user/profile">
              <b className="hover:text-gray-300">Profile</b>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/user/friends">
              <b className="hover:text-gray-300">Friends</b>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
