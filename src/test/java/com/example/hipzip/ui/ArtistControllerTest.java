package com.example.hipzip.ui;

import static org.junit.jupiter.api.Assertions.assertAll;

import com.example.hipzip.application.ArtistService;
import com.example.hipzip.application.dto.ArtistListResponse;
import com.example.hipzip.domain.artist.Artist;
import com.example.hipzip.domain.artist.ArtistFixture;
import com.example.hipzip.domain.artist.ArtistRepository;
import com.example.hipzip.domain.artist.HashTagRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class ArtistControllerTest {

    @Autowired
    public ArtistService artistService;
    @Autowired
    public HashTagRepository hashTagRepository;
    @Autowired
    public ArtistRepository artistRepository;

    @LocalServerPort
    private int port;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @Test
    void 아티스트를_저장할_수_있다() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(ArtistFixture.이서_저장_요청())
                .when().post("/artists")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());

        assertAll(
                () -> Assertions.assertThat(hashTagRepository.findByName("LEESEO")).isNotNull(),
                () -> Assertions.assertThat(hashTagRepository.findByName("이서")).isNotNull(),
                () -> Assertions.assertThat(hashTagRepository.findByName("아이브")).isNotNull()
        );
    }

    @Test
    void 아티스트를_조회할_수_있다() {
        artistService.saveArtist(ArtistFixture.이서_저장_요청());

        ArtistListResponse[] responses = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/artists?name=아이브")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(ArtistListResponse[].class);

        Assertions.assertThat(responses.length).isEqualTo(1);
    }

    @Test
    void 아티스트를_수정할_수_있다() {
        Long 이서_ID = artistService.saveArtist(ArtistFixture.이서_저장_요청());
        Long 아이브_ID = artistService.saveArtist(ArtistFixture.아이브_저장_요청());

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(ArtistFixture.아이브_수정_요청())
                .when().put("/artists")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());

        Artist 이서 = artistRepository.findById(이서_ID).orElseThrow();
        Artist 아이브 = artistRepository.findById(아이브_ID).orElseThrow();

        assertAll(
                () -> Assertions.assertThat(이서.getGroup().getId()).isEqualTo(ArtistFixture.아이브_수정_요청().id()),
                () -> Assertions.assertThat(아이브.getName()).isEqualTo(ArtistFixture.아이브_수정_요청().name()),
                () -> Assertions.assertThat(아이브.getImage()).isEqualTo(ArtistFixture.아이브_수정_요청().image())
        );
    }
}
