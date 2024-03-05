import { cn } from "@/lib/utils";

interface LabelProps {
  message: string;
  className?: string;
  onClick?: () => void;
}

const Label = (props: LabelProps) => {
  return (
    <div
      className={cn("text-4xl text-center", props.className || "")}
      onClick={props.onClick}
    >
      {props.message}
    </div>
  );
};

export default Label;
