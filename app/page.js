import Sidebar from "@/sharedComponents/layout/sidebar";
import Image from "next/image";
import Header from "@/sharedComponents/layout/header";
import Footer from "@/sharedComponents/layout/Footer";
import Services from "@/sharedComponents/layout/services";
import AccessDemandPage from "@/sharedComponents/componenets/testMulti";
import PortalInfo from "@/sharedComponents/containers/portalInfo";

export default function Home() {
  return (
    <div className="m-auto">
      <PortalInfo/>
      </div>
  );
}
