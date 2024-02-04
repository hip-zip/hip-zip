package com.example.hipzip.ui;

import static org.junit.jupiter.api.Assertions.assertAll;

import com.example.hipzip.DatabaseClearExtension;
import com.example.hipzip.application.ArtistService;
import com.example.hipzip.application.dto.AlbumSaveRequest;
import com.example.hipzip.domain.album.Album;
import com.example.hipzip.domain.album.AlbumRepository;
import com.example.hipzip.domain.artist.ArtistFixture;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import java.time.LocalDateTime;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;

@ExtendWith(DatabaseClearExtension.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class AlbumControllerTest {

    @Autowired
    private AlbumRepository albumRepository;
    @Autowired
    private ArtistService artistService;

    @LocalServerPort
    private int port;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @Test
    void 앨범을_저장할_수_있다() {
        //given-when
        Long 아이브_ID = artistService.save(ArtistFixture.아이브_저장_요청());

        AlbumSaveRequest request = new AlbumSaveRequest(
                "WAVE",
                "https://cdnimg.melon.co.kr/cm2/album/images/112/53/005/11253005_20230530104634_500.jpg?e7c6924554495111b3c75ef13b53a251/melon/resize/282/quality/80/optimize",
                LocalDateTime.of(2023, 5, 31, 0, 0),
                "https://youtu.be/qD1kP_nJU3o?si=2aXe5_eU2goMOTOG",
                아이브_ID
        );

        Response response = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/albums");

        String[] location = response.getHeader("Location").split("/");
        String id = location[location.length - 1];

        Album album = albumRepository.getById(Long.valueOf(id));

        //then
        assertAll(
                () -> Assertions.assertThat(album.getName()).isEqualTo(request.name()),
                () -> Assertions.assertThat(album.getImage()).isEqualTo(request.image()),
                () -> Assertions.assertThat(album.getMusicVideo()).isEqualTo(request.musicVideo()),
                () -> Assertions.assertThat(album.getReleaseDate()).isEqualTo(request.releaseDate()),
                () -> Assertions.assertThat(album.getArtist().getId()).isEqualTo(request.artistId())
        );

    }
}
