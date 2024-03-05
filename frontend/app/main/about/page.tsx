import Image from "next/image";
import Cdd from "@/public/static/cddProfile.jpeg";
import Ion from "@/public/static/ionProfile.jpeg";
import Vincent from "@/public/static/vincentProfile.png";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className={"h-full w-96 p-10"}>
        {/*<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">*/}
        {/*  HIP-ZIP을 만들게 된 계기*/}
        {/*</h3>*/}

        {/*<p className="mt-2 leading-7 text-base">*/}
        {/*  힙합을 정말 좋아하는 사람이라면 트랙 보다는 앨범 단위에 큰 의미를 두고*/}
        {/*  계실겁니다. 힙합어워즈에서는 매년 올해의 앨범을 선정하고, 많은*/}
        {/*  힙합팬들은 이 행사에 열광합니다. 앨범을 내지 않는 아티스트는*/}
        {/*  사람들로부터 비난을 받기도 하고, 앨범을 내 명반으로 선정이 된다면 꽤*/}
        {/*  오랜시간 동안 그 명성을 유지할 수 있습니다. 앨범의 가치는 종종 열리는*/}
        {/*  힙합 행사에서 앨범아트가 그려진 MD를 아직도 많이 판매하는 것을 봐도 알*/}
        {/*  수 있죠.*/}
        {/*</p>*/}

        {/*<p className="mt-2 leading-7 text-base">*/}
        {/*  그만큼 "올해의 힙합앨범"이라는 주제는 힙합 팬들에게 엄청난 대화*/}
        {/*  주제입니다. 어워즈 시즌이 되면 커뮤니티는 누가 수상할 것인지에 대해*/}
        {/*  토론을 나누기도 하죠. "HIP-ZIP"을 개발한 저도 친구들과 술잔을 기울이며*/}
        {/*  이 부분에 대해 자주 이야기를 나누곤 합니다. 그럴때마다 한 해를*/}
        {/*  뒤돌아보며 발매된 앨범들이 뭐가 있나 살펴보곤 하는데, 다들 아시다시피*/}
        {/*  힙합의 바운더리가 많이 넓어졌잖아요? 그래서 래퍼들의 작품들을 위주로*/}
        {/*  한 해 동안 나온 앨범들을 모아 볼 수 있는 사이트가 필요하다 느꼈습니다.*/}
        {/*</p>*/}

        {/*<h3 className="mt-4 scroll-m-20 text-2xl tracking-tight">주요 기능</h3>*/}

        {/*<h4 className="mt-2 scroll-m-20 text-lg tracking-tight">*/}
        {/*  🔥 힙합 앨범 모아보기*/}
        {/*</h4>*/}

        {/*<p className="mt-1 leading-7 text-base">*/}
        {/*  당연히 있어야 하는 기능이겠죠, 년마다 나온 힙합 앨범 리스트를 편하게*/}
        {/*  모아볼 수 있는 기능을 제공합니다. 각각의 이미지를 클릭하면 해당 앨범의*/}
        {/*  상세 정보를 볼 수 있고, 좋아요 및 싫어요 기능도 지원 예정입니다.*/}
        {/*</p>*/}

        {/*<h4 className="mt-2 scroll-m-20 text-lg font-semibold tracking-tight">*/}
        {/*  🔥 커뮤니티 기능*/}
        {/*</h4>*/}

        {/*<p className="mt-1 leading-7 text-base">*/}
        {/*  회원가입 기능을 지원할 예정입니다. 아마 카카오 로그인으로 진행할거라*/}
        {/*  편하게 로그인 하실 수 있으실겁니다. 기능테스트가 완료되면 공식적으로*/}
        {/*  배포할 것 같습니다.*/}
        {/*</p>*/}

        {/*<p className="mt-1 leading-7 text-base">*/}
        {/*  1인 개발이라 커뮤니티 기능 제작에 시간이 제법 소요될 것 같긴 한데,*/}
        {/*  앨범마다 댓글 정도는 달 수 있도록 기능 지원 예정입니다.*/}
        {/*</p>*/}

        {/*<h4 className="mt-2 scroll-m-20 text-lg font-semibold tracking-tight">*/}
        {/*  🔥 아티스트 & 그룹 등록 및 조회 기능*/}
        {/*</h4>*/}

        {/*<p className="mt-1 leading-7 text-base">*/}
        {/*  아티스트는 크게 솔로 아티스트, 그룹 아티스트로 나뉩니다. 그룹은 레이블*/}
        {/*  혹은 크루 단위가 될 수 있고, 등록시 등록된 아티스트와 매핑 시키는*/}
        {/*  방식을 채택합니다.*/}
        {/*</p>*/}

        {/*<h4 className="mt-2 scroll-m-20 text-lg font-semibold tracking-tight">*/}
        {/*  🔥 뮤직비디오 조회 기능*/}
        {/*</h4>*/}

        {/*<p className="mt-1 leading-7 text-base">*/}
        {/*  앨범마다 뮤직비디오가 있을 시 등록할 때 MV도 동시에 링크로 등록합니다.*/}
        {/*  앨범 상세 페이지에 들어가면 뮤직비디오도 함께 감상하실 수 있습니다.*/}
        {/*</p>*/}
        <p className={"mt-4 street text-xl text-center"}>Developer</p>
        <Link
          href={"https:github.com/devcdd/hip_zip"}
          className={"flex justify-center"}
        >
          <Image
            src={Cdd}
            alt={"개발자한테 사진 넣으라고 말해주세요"}
            className={"rounded-full m-10 cursor-pointer"}
            width={200}
            height={200}
          />
        </Link>
        <div className={"border-2 border-sky-500 p-5"}>
          <p className={"s-core-medium text-sm text-center"}>
            CDD (Front-End Developer)
          </p>
        </div>
        {/*<p className={"street mt-10 font-sans text-xl text-center"}>Contribute</p>*/}
        {/*<div className={"grid grid-cols-1 lg:grid-cols-2 gap-10"}>*/}
        {/*  <div>*/}
        {/*    <Link*/}
        {/*      href={"https:www.instagram.com/neo_viincent/"}*/}
        {/*      className={"flex justify-center items-center"}*/}
        {/*    >*/}
        {/*      <Image*/}
        {/*        src={Vincent}*/}
        {/*        alt={"개발자한테 사진 넣으라고 말해주세요"}*/}
        {/*        className={"rounded-full m-3 cursor-pointer"}*/}
        {/*        width={200}*/}
        {/*        height={200}*/}
        {/*      />*/}
        {/*    </Link>*/}
        {/*    <div className={"mt-3 border-2 border-sky-500 p-5"}>*/}
        {/*      <p className={"font-mono text-base text-center"}>Neo Vincent</p>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <Link*/}
        {/*      href={"https:www.instagram.com/ion0323/"}*/}
        {/*      className={"flex justify-center items-center"}*/}
        {/*    >*/}
        {/*      <Image*/}
        {/*        src={Ion}*/}
        {/*        alt={"개발자한테 사진 넣으라고 말해주세요"}*/}
        {/*        className={"rounded-full m-3 cursor-pointer"}*/}
        {/*        width={200}*/}
        {/*        height={200}*/}
        {/*      />*/}
        {/*    </Link>*/}
        {/*    <div className={"mt-3 border-2 border-sky-500 p-5"}>*/}
        {/*      <p className={"font-mono text-base text-center"}>ION</p>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div
          className={
            "flex justify-center items-center m-10 p-10 text-amber-500 border-2 border-orange-700 rounded-lg"
          }
        >
          <Link href={"/admin/album"} className={"text-sm"}>
            앨범 입력
          </Link>
        </div>
        <div
          className={
            "flex justify-center items-center m-10 p-10 text-amber-500 border-2 border-orange-700 rounded-lg"
          }
        >
          <Link href={"/admin/artist"} className={"text-sm"}>
            아티스트 입력
          </Link>
        </div>
        <p className={"font-mono text-4xl text-center"}>Contact</p>
        <div className={"mt-10 border-2 border-sky-500 p-5"}>
          <p className={"font-mono text-xl text-center"}>E-Mail</p>
          <p className={"font-mono text-xl text-center"}>
            developer.cdd@gmail.com
          </p>
        </div>
      </div>
    </>
  );
}
