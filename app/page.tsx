import NavBar from "@/components/NavBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <>
      <div>
        <SidebarProvider defaultOpen={true}>
          <NavBar />
        </SidebarProvider>
      </div>
    </>
  );
}
