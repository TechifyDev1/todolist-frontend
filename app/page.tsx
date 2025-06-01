import MainSection from "@/components/MainSection";
import NavBar from "@/components/NavBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-background">
      <NavBar />
      <MainSection />
    </div>
  );
}
