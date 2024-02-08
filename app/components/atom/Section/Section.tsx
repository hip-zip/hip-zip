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
      <div className={"flex flex-col justify-center items-center gap-8 "}>
        <props.icon
          className={
            "text-hipzip-white h-32 w-32 hover:scale-110 transition-transform"
          }
        />
        <div className={cn("h-full flex justify-center items-center text-lg")}>
          {props.message}
        </div>
      </div>
    </Link>
  );
};

export default Section;
