
const Sidebar = () => {
  return (
    <div className="hidden md:block w-1/4 bg-light p-4 space-y-4 sticky top-20">
      <h3 className="font-bold">Navigation</h3>
      <ul className="space-y-2">
        <li className="hover:text-primary cursor-pointer">Home</li>
        <li className="hover:text-primary cursor-pointer">Profile</li>
        <li className="hover:text-primary cursor-pointer">Friends</li>
        <li className="hover:text-primary cursor-pointer">Messages</li>
      </ul>
    </div>
  );
};

export default Sidebar;
