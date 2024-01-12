import { cn } from "@/lib/utils";

interface LabelProps {
  message: string;
  className?: string;
}

const Label = (props: LabelProps) => {
  return (
    <div className={cn("text-4xl text-center", props.className || "")}>
      {props.message}
    </div>
  );
};

export default Label;
