import { LucideProps } from "lucide-react";
import React from "react";

interface navLinks {
  title: string;
  href: string;
  logo: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export interface navbarData {
  title: string;
  logo: string;
  navLinks: navLinks[];
}
