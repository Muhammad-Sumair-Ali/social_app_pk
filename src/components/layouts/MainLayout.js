
// import Footer from '../common/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Common Header */}
      {/* <Header /> */}

      {/* Main Content */}
      <main className="flex-1 p-4">{children}</main>

      Common Footer
      {/* <Footer /> */}
    </div>
  );
}
