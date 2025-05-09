import Sidebar from "@/sharedComponents/layout/sidebar";
import Image from "next/image";
import Header from "@/sharedComponents/layout/header";
import Footer from "@/sharedComponents/layout/Footer";
import Services from "@/sharedComponents/layout/services";
import AccessDemandPage from "@/sharedComponents/componenets/testMulti";

export default function Home() {
  return (
    <div className="bg-main-beige">
    <div className="grid grid-cols-5  min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="h-screen border-2 border-gray-200 w-fit rounded-lg col-span-1">
      <Sidebar />
      </div>
      <div className="col-span-4 w-full m-0 p-0">
      <Header/>
      <Services/>
      <AccessDemandPage/>
      </div>
      
    </div>
    <div className="w-full">
      <Footer/>
      </div>
      </div>
  );
}
