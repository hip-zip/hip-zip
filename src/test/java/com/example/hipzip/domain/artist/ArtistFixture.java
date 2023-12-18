package com.example.hipzip.domain.artist;

public class ArtistFixture {

    public static Artist IVE(){
        return Artist.create("IVE",
                "https://cdnimg.melon.co.kr/cm2/artistcrop/images/030/55/146/3055146_20231013113531_500.jpg",
                ArtistType.GROUP
        );
    }

    public static Artist 르세라핌(){
        return Artist.create(
                "르세라핌",
                "https://cdnimg.melon.co.kr/cm2/artistcrop/images/030/92/950/3092950_20231027105934_500.jpg",
                ArtistType.GROUP
        );
    }

    public static Artist 장원영(){
        return Artist.create(
                "장원영",
                "https://cdnimg.melon.co.kr/cm2/artistcrop/images/023/99/717/2399717_20231013113853_500.jpg",
                ArtistType.SOLO
        );
    }

    public static Artist 이서(){
        return Artist.create(
                "이서",
                "https://cdnimg.melon.co.kr/cm2/artistcrop/images/030/55/172/3055172_20231013114039_500.jpg",
                ArtistType.SOLO
        );
    }
}
