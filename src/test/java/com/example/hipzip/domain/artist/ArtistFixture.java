package com.example.hipzip.domain.artist;

import com.example.hipzip.application.dto.artist.ArtistModifyRequest;
import com.example.hipzip.application.dto.artist.ArtistSaveRequest;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class ArtistFixture {

    public static Artist IVE() {
        return Artist.builder()
                .name("IVE")
                .image("https://cdnimg.melon.co.kr/cm2/artistcrop/images/030/55/146/3055146_20231013113531_500.jpg")
                .artistType(ArtistType.GROUP)
                .build();
    }

    public static Artist 르세라핌() {
        return Artist.builder()
                .name("르세라핌")
                .image("https://cdnimg.melon.co.kr/cm2/artistcrop/images/030/92/950/3092950_20231027105934_500.jpg")
                .artistType(ArtistType.GROUP)
                .build();
    }

    public static Artist 장원영() {
        return Artist.builder().name("장원영")
                .image("https://cdnimg.melon.co.kr/cm2/artistcrop/images/023/99/717/2399717_20231013113853_500.jpg")
                .artistType(ArtistType.SOLO)
                .build();
    }

    public static Artist 이서() {
        return Artist.builder()
                .name("이서")
                .image("https://cdnimg.melon.co.kr/cm2/artistcrop/images/030/55/172/3055172_20231013114039_500.jpg")
                .artistType(ArtistType.SOLO)
                .build();
    }

    public static ArtistSaveRequest 이서_저장_요청() {
        return new ArtistSaveRequest(
                "이서",
                "https://cdnimg.melon.co.kr/cm2/artistcrop/images/030/55/172/3055172_20231013114039_500.jpg",
                ArtistType.SOLO.name(),
                List.of("LEESEO", "이서", "아이브")
        );
    }

    public static ArtistSaveRequest 장원영_저장_요청() {
        return new ArtistSaveRequest(
                "장원영",
                "https://cdnimg.melon.co.kr/cm2/artistcrop/images/030/55/172/3055172_20231013114039_500.jpg",
                ArtistType.SOLO.name(),
                List.of("Jang Wonyoung","아이즈원", "장원영", "아이브")
        );
    }

    public static ArtistSaveRequest 아이브_저장_요청() {
        return new ArtistSaveRequest(
                "ive",
                "https://cdnimg.melon.co.kr/cm2/artistcrop/images/030/55/146/3055146_20231013113531_500.jpg",
                ArtistType.GROUP.name(),
                List.of("아이브", "ive")
        );
    }

    public static ArtistModifyRequest 아이브_이서_추가_요청() {
        return  new ArtistModifyRequest(
                1L,
                "IVE",
                "https://image.blip.kr/v1/file/f17114ade66730456e304bef23258bb6",
                List.of("아이브", "ive", "IVE"),
                List.of(2L)
        );
    }

    public static ArtistModifyRequest 아이브_이서_삭제_요청() {
        return  new ArtistModifyRequest(
                1L,
                "IVE",
                "https://image.blip.kr/v1/file/f17114ade66730456e304bef23258bb6",
                List.of("아이브", "ive", "IVE"),
                Collections.emptyList()
        );
    }
}
