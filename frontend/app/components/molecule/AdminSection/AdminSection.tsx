import Section from "@/app/components/atom/Section/Section";
import UsersIcon from "@/app/components/atom/Icon/UsersIcon";
import MusicIcon from "@/app/components/atom/Icon/MusicIcon";

const AdminSection = () => {
  return (
    <div
      className={
        "w-full h-full min-h-screen flex justify-center items-center p-10"
      }
    >
      <Section
        icon={UsersIcon}
        className={"w-[50%]"}
        message={"아티스트 관리"}
        redirectURL={"/admin/artist"}
      />
      <Section
        icon={MusicIcon}
        className={"w-[50%]"}
        message={"앨범 관리"}
        redirectURL={"/admin/album"}
      />
    </div>
  );
};

export default AdminSection;
