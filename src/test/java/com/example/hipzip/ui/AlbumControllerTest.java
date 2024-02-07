package com.example.hipzip.ui;

import static org.junit.jupiter.api.Assertions.assertAll;

import com.example.hipzip.DatabaseClearExtension;
import com.example.hipzip.application.dto.album.AlbumDetailResponse;
import com.example.hipzip.application.dto.album.AlbumResponse;
import com.example.hipzip.application.dto.album.AlbumSaveRequest;
import com.example.hipzip.domain.AlbumFixture;
import com.example.hipzip.domain.album.Album;
import com.example.hipzip.domain.album.AlbumRepository;
import com.example.hipzip.domain.artist.Artist;
import com.example.hipzip.domain.artist.ArtistFixture;
import com.example.hipzip.domain.artist.ArtistRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import java.util.Optional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;

@ExtendWith(DatabaseClearExtension.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class AlbumControllerTest {

    @Autowired
    private AlbumRepository albumRepository;
    @Autowired
    private ArtistRepository artistRepository;

    @LocalServerPort
    private int port;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @Test
    void 앨범을_저장할_수_있다() {
        //given-when
        Artist 아이브 = artistRepository.save(ArtistFixture.IVE());

        AlbumSaveRequest request = AlbumFixture.WAVE_앨범_저장_요청(아이브.getId());

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

    @Test
    void 앨범을_조회할_수_있다() {
        //given-when
        Artist 아이브 = artistRepository.save(ArtistFixture.IVE());
        Album WAVE = AlbumFixture.WAVE_앨범(아이브);

        albumRepository.save(WAVE);

        AlbumResponse[] responses = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/albums")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(AlbumResponse[].class);

        //then
        assertAll(
                () -> Assertions.assertThat(responses.length).isEqualTo(1),
                () -> Assertions.assertThat(responses[0].id()).isEqualTo(WAVE.getId()),
                () -> Assertions.assertThat(responses[0].name()).isEqualTo(WAVE.getName()),
                () -> Assertions.assertThat(responses[0].image()).isEqualTo(WAVE.getImage())
        );
    }

    @Test
    void 앨범을_상세_조회할_수_있다() {
        //given-when
        Artist 아이브 = artistRepository.save(ArtistFixture.IVE());
        Album WAVE = AlbumFixture.WAVE_앨범(아이브);

        albumRepository.save(WAVE);

        AlbumDetailResponse responses = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/albums/" + WAVE.getId())
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(AlbumDetailResponse.class);

        //then
        assertAll(
                () -> Assertions.assertThat(responses.id()).isEqualTo(WAVE.getId()),
                () -> Assertions.assertThat(responses.name()).isEqualTo(WAVE.getName()),
                () -> Assertions.assertThat(responses.image()).isEqualTo(WAVE.getImage()),
                () -> Assertions.assertThat(responses.musicVideo()).isEqualTo(WAVE.getMusicVideo()),
                () -> Assertions.assertThat(responses.releaseDate()).isEqualTo(WAVE.getReleaseDate()),
                () -> Assertions.assertThat(responses.artistResponse().id()).isEqualTo(WAVE.getArtist().getId())
        );
    }

    @Test
    void 앨범을_삭제할_수_있다() {
        //given-when
        Artist 아이브 = artistRepository.save(ArtistFixture.IVE());
        Album WAVE = AlbumFixture.WAVE_앨범(아이브);

        albumRepository.save(WAVE);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().delete("/albums/" + WAVE.getId())
                .then().log().all()
                .statusCode(HttpStatus.OK.value());

        //then
        Optional<Album> findAlbum = albumRepository.findById(WAVE.getId());

        Assertions.assertThat(findAlbum).isEmpty();
    }
}
