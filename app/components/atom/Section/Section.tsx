import Link from "next/link";
import { cn } from "@/lib/utils";
import React, { ComponentType } from "react";

interface SectionProps {
  className?: string;
  icon: React.FC<{ className: string }>;
  // icon: any;
  message: string;
  redirectURL: string;
}

const Section = (props: SectionProps) => {
  return (
    <Link
      className={cn(props.className || "", "h-full")}
      href={props.redirectURL}
    >
      {/*{props.icon && <props.icon className={"text-hipzip-white"} />}*/}
      <props.icon className={"text-hipzip-white"} />
      <Link
        href={props.redirectURL}
        className={cn(
          "border border-hipzip-white h-full flex justify-center items-center",
        )}
      >
        {props.message}
      </Link>
    </Link>
  );
};

export default Section;
