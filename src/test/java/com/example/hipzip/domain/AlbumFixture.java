package com.example.hipzip.domain;

import com.example.hipzip.application.dto.album.AlbumSaveRequest;
import com.example.hipzip.domain.album.Album;
import com.example.hipzip.domain.artist.Artist;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class AlbumFixture {

    public static Album WAVE_앨범(Artist artist) {
        return Album.builder()
                .name("WAVE")
                .image("https://cdnimg.melon.co.kr/cm2/album/images/112/53/005/11253005_20230530104634_500.jpg?e7c6924554495111b3c75ef13b53a251/melon/resize/282/quality/80/optimize")
                .releaseDate(LocalDate.of(2023, 5, 31))
                .musicVideo("https://youtu.be/qD1kP_nJU3o?si=2aXe5_eU2goMOTOG")
                .artist(artist)
                .build();
    }

    public static Album IVE_IVE_앨범(Artist artist) {
        return Album.builder()
                .name("I've IVE")
                .image("https://cdnimg.melon.co.kr/cm2/album/images/112/11/297/11211297_20230410151046_500.jpg?1af1b1d675154cbc4d581f9b36c75ebf/melon/resize/282/quality/80/optimize")
                .releaseDate(LocalDate.of(2023, 4, 10))
                .musicVideo("https://youtu.be/6ZUIwj3FgUY?si=dqUn6dxrlLEMyNFI")
                .artist(artist)
                .build();
    }

    public static AlbumSaveRequest WAVE_앨범_저장_요청(Long artistId) {
        return new AlbumSaveRequest(
                "WAVE",
                "https://cdnimg.melon.co.kr/cm2/album/images/112/53/005/11253005_20230530104634_500.jpg?e7c6924554495111b3c75ef13b53a251/melon/resize/282/quality/80/optimize",
                LocalDate.of(2023, 5, 31),
                "https://youtu.be/qD1kP_nJU3o?si=2aXe5_eU2goMOTOG",
                artistId
        );
    }
}
