import Navbar from "@/components/common/Navbar";
import HomePage from "@/components/HomePage";


export default function Home() {
  return (
    <>
     <div className="bg-light min-h-screen">
      <Navbar />
    <HomePage/>
    </div>
    </>
  );
}
