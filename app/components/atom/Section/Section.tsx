import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionProps {
  className?: string;
  message: string;
  redirectURL: string;
}

const Section = (props: SectionProps) => {
  return (
    <Link
      href={props.redirectURL}
      className={cn(
        "border border-hipzip-white h-full flex justify-center items-center",
        props.className || "",
      )}
    >
      {props.message}
    </Link>
  );
};

export default Section;
