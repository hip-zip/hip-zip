package com.example.hipzip.ui;

import static org.junit.jupiter.api.Assertions.assertAll;

import com.example.hipzip.DatabaseClearExtension;
import com.example.hipzip.application.ArtistService;
import com.example.hipzip.application.dto.artist.ArtistDetailResponse;
import com.example.hipzip.application.dto.artist.ArtistResponse;
import com.example.hipzip.domain.artist.Artist;
import com.example.hipzip.domain.artist.ArtistFixture;
import com.example.hipzip.domain.artist.ArtistRepository;
import com.example.hipzip.domain.artist.ArtistType;
import com.example.hipzip.domain.artist.HashtagRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;

@ExtendWith(DatabaseClearExtension.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class ArtistControllerTest {

    @Autowired
    private ArtistService artistService;
    @Autowired
    private HashtagRepository hashTagRepository;
    @Autowired
    private ArtistRepository artistRepository;

    @LocalServerPort
    private int port;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @Test
    void 아티스트를_저장할_수_있다() {
        //given-when
        Response response = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(ArtistFixture.이서_저장_요청())
                .when().post("/artists");

        String[] location = response.getHeader("Location").split("/");
        String id = location[location.length - 1];
        Artist artist = artistRepository.getById(Long.valueOf(id));

        //then
        assertAll(
                () -> Assertions.assertThat(artist.getName()).isEqualTo("이서"),
                () -> Assertions.assertThat(artist.getImage()).isEqualTo(
                        "https://cdnimg.melon.co.kr/cm2/artistcrop/images/030/55/172/3055172_20231013114039_500.jpg"),
                () -> Assertions.assertThat(artist.getArtistType()).isEqualTo(ArtistType.SOLO),
                () -> Assertions.assertThat(hashTagRepository.findByNameStartsWith("LEESEO")).hasSize(1),
                () -> Assertions.assertThat(hashTagRepository.findByNameStartsWith("이서")).hasSize(1),
                () -> Assertions.assertThat(hashTagRepository.findByNameStartsWith("아이브")).hasSize(1)
        );
    }

    @Test
    void 아티스트를_태그로_조회할_수_있다() {
        //given-when
        Long id = artistService.save(ArtistFixture.이서_저장_요청());

        ArtistResponse[] responses = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/artists/search?name=아이브")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(ArtistResponse[].class);

        //then
        assertAll(
                () -> Assertions.assertThat(responses.length).isEqualTo(1),
                () -> Assertions.assertThat(responses[0].id()).isEqualTo(id),
                () -> Assertions.assertThat(responses[0].name()).isEqualTo(ArtistFixture.이서_저장_요청().name()),
                () -> Assertions.assertThat(responses[0].image()).isEqualTo(ArtistFixture.이서_저장_요청().image())
        );
    }

    @Test
    void 아티스트를_태그_접두사로_조회할_수_있다() {
        //given-when
        Long id = artistService.save(ArtistFixture.장원영_저장_요청());

        ArtistResponse[] responses = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/artists/search?name=아")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(ArtistResponse[].class);

        //then
        assertAll(
                () -> Assertions.assertThat(responses.length).isEqualTo(1),
                () -> Assertions.assertThat(responses[0].id()).isEqualTo(id),
                () -> Assertions.assertThat(responses[0].name()).isEqualTo(ArtistFixture.장원영_저장_요청().name()),
                () -> Assertions.assertThat(responses[0].image()).isEqualTo(ArtistFixture.장원영_저장_요청().image())
        );
    }

    @Test
    void 아티스트를_조회할_수_있다() {
        //given-when
        Long 장원영_id = artistService.save(ArtistFixture.장원영_저장_요청());
        Long 이서_id = artistService.save(ArtistFixture.이서_저장_요청());

        ArtistResponse[] responses = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/artists")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(ArtistResponse[].class);

        //then
        assertAll(
                () -> Assertions.assertThat(responses.length).isEqualTo(2),
                () -> Assertions.assertThat(responses[0].id()).isEqualTo(이서_id),
                () -> Assertions.assertThat(responses[0].name()).isEqualTo(ArtistFixture.이서_저장_요청().name()),
                () -> Assertions.assertThat(responses[0].image()).isEqualTo(ArtistFixture.이서_저장_요청().image()),
                () -> Assertions.assertThat(responses[1].id()).isEqualTo(장원영_id),
                () -> Assertions.assertThat(responses[1].name()).isEqualTo(ArtistFixture.장원영_저장_요청().name()),
                () -> Assertions.assertThat(responses[1].image()).isEqualTo(ArtistFixture.장원영_저장_요청().image())
        );
    }

    @Test
    void 그룹멤버를_추가_할_수_있다() {
        //given-when
        Long 아이브_ID = artistService.save(ArtistFixture.아이브_저장_요청());
        Long 이서_ID = artistService.save(ArtistFixture.이서_저장_요청());

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(ArtistFixture.아이브_이서_추가_요청())
                .when().put("/artists")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());

        Artist 이서 = artistRepository.getById(이서_ID);
        Artist 아이브 = artistRepository.getById(아이브_ID);

        //then
        assertAll(
                () -> Assertions.assertThat(이서.getGroup().getId()).isEqualTo(ArtistFixture.아이브_이서_추가_요청().id()),
                () -> Assertions.assertThat(아이브.getName()).isEqualTo(ArtistFixture.아이브_이서_추가_요청().name()),
                () -> Assertions.assertThat(아이브.getImage()).isEqualTo(ArtistFixture.아이브_이서_추가_요청().image())
        );
    }

    @Test
    void 그룹멤버를_삭제할_수_있다() {
        //given-when
        Long 아이브_ID = artistService.save(ArtistFixture.아이브_저장_요청());
        Long 이서_ID = artistService.save(ArtistFixture.이서_저장_요청());
        artistService.edit(ArtistFixture.아이브_이서_추가_요청());

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(ArtistFixture.아이브_이서_삭제_요청())
                .when().put("/artists")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());

        Artist 이서 = artistRepository.findById(이서_ID).orElseThrow();
        Artist 아이브 = artistRepository.findById(아이브_ID).orElseThrow();

        //then
        assertAll(
                () -> Assertions.assertThat(이서.getGroup()).isNull(),
                () -> Assertions.assertThat(아이브.getMembers()).isEmpty()
        );
    }

    @Test
    void 아티스트를_삭제_할_수_있다() {
        //given-when
        Long id = artistService.save(ArtistFixture.이서_저장_요청());

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().delete("/artists/" + id)
                .then().log().all()
                .statusCode(HttpStatus.OK.value());

        //then
        Assertions.assertThat(artistRepository.findById(id)).isEmpty();
    }

    @Test
    void 아티스트를_상세_조회_할_수_있다() {
        //given-when
        Long id = artistService.save(ArtistFixture.이서_저장_요청());

        ArtistDetailResponse response = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/artists/" + id)
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(ArtistDetailResponse.class);

        //then
        assertAll(
                () -> Assertions.assertThat(response.id()).isEqualTo(id),
                () -> Assertions.assertThat(response.name()).isEqualTo(ArtistFixture.이서_저장_요청().name()),
                () -> Assertions.assertThat(response.image()).isEqualTo(ArtistFixture.이서_저장_요청().image()),
                () -> Assertions.assertThat(response.artistType()).isEqualTo(ArtistFixture.이서_저장_요청().artistType()),
                () -> Assertions.assertThat(response.hashtag()).isEqualTo(ArtistFixture.이서_저장_요청().hashtag())
        );
    }
}
