import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps<> {
  target: string;
  action: string;
  ok: () => void;
}

const ConfirmDialog = (props: ConfirmDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">{props.action}하기</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className={"bg-hipzip-white text-hipzip-black"}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {props.target} {props.action}하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className={"text-base font-bold mb-2"}>Check List</div>
            <div>- 이미 입력된 {props.target}는 아닌지 확인해보세요 !</div>
            <div>- 검색 힌트를 {props.target}와 연관지어 주세요 !</div>
            <div>- {props.target}의 이름에 오타가 없는지 확인해보세요 !</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            className={"bg-hipzip-black text-hipzip-white"}
            onClick={props.ok}
          >
            {props.action}하기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
