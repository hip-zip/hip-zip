package com.example.hipzip.domain.artist;

import com.example.hipzip.application.dto.ArtistSaveRequest;
import java.util.List;

public class ArtistFixture {

    public static Artist IVE() {
        return Artist.builder()
                .name("IVE")
                .image("https://cdnimg.melon.co.kr/cm2/artistcrop/images/030/55/146/3055146_20231013113531_500.jpg")
                .artistType(ArtistType.GROUP)
                .artistTags(List.of(
                        new ArtistTag("아이브"),
                        new ArtistTag("IVE"),
                        new ArtistTag("ive")
                ))
                .build();
    }

    public static Artist 르세라핌() {
        return Artist.builder()
                .name("르세라핌")
                .image("https://cdnimg.melon.co.kr/cm2/artistcrop/images/030/92/950/3092950_20231027105934_500.jpg")
                .artistType(ArtistType.GROUP)
                .artistTags(List.of(new ArtistTag("LE SSERAFIM")))
                .build();
    }

    public static Artist 장원영() {
        return Artist.builder().name("장원영")
                .image("https://cdnimg.melon.co.kr/cm2/artistcrop/images/023/99/717/2399717_20231013113853_500.jpg")
                .artistType(ArtistType.SOLO)
                .artistTags(List.of(
                        new ArtistTag("JANG WONYOUNG"),
                        new ArtistTag("아이브"),
                        new ArtistTag("IVE"),
                        new ArtistTag("ive")
                ))
                .build();
    }

    public static Artist 이서() {
        return Artist.builder()
                .name("이서")
                .image("https://cdnimg.melon.co.kr/cm2/artistcrop/images/030/55/172/3055172_20231013114039_500.jpg")
                .artistType(ArtistType.SOLO)
                .artistTags(List.of(
                        new ArtistTag("LEESEO"),
                        new ArtistTag("아이브"),
                        new ArtistTag("IVE"),
                        new ArtistTag("ive")
                ))
                .build();
    }

    public static ArtistSaveRequest 이서_저장_요청() {
        return new ArtistSaveRequest(
                "이서",
                "https://cdnimg.melon.co.kr/cm2/artistcrop/images/030/55/172/3055172_20231013114039_500.jpg",
                ArtistType.SOLO,
                List.of("LEESEO")
        );
    }
}
