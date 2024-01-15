import Section from "@/app/components/atom/Section/Section";

const AdminSection = () => {
  return (
    <div className={"w-full h-[60%] flex justify-center items-center p-10"}>
      <Section
        className={"w-[50%]"}
        message={"아티스트 관리"}
        redirectURL={"/admin/artist"}
      />
      <Section
        className={"w-[50%]"}
        message={"앨범 관리"}
        redirectURL={"/admin/album"}
      />
    </div>
  );
};

export default AdminSection;
