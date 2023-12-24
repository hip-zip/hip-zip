package com.example.hipzip.ui;

import com.example.hipzip.domain.artist.ArtistFixture;
import com.example.hipzip.domain.artist.ArtistRepository;
import com.example.hipzip.domain.artist.ArtistTagRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
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
    public ArtistTagRepository artistTagRepository;
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
    }

    @Test
    void 아티스트를_조회할_수_있다() {
        artistRepository.save(ArtistFixture.이서());
        artistRepository.save(ArtistFixture.장원영());
        artistRepository.save(ArtistFixture.IVE());

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/artists?name=아이브")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }
}
