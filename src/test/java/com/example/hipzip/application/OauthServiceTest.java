package com.example.hipzip.application;

import static org.mockito.ArgumentMatchers.refEq;
import static org.mockito.BDDMockito.given;

import com.example.hipzip.DatabaseClearExtension;
import com.example.hipzip.infra.OauthProviders;
import com.example.hipzip.infra.OauthTokenRequest;
import com.example.hipzip.util.JwtTokenProvider;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;

@SuppressWarnings("NonAsciiCharacters")
@ExtendWith(DatabaseClearExtension.class)
@SpringBootTest(webEnvironment = WebEnvironment.NONE)
class OauthServiceTest {

    @Autowired
    private OauthService oauthService;
    @MockBean
    private OauthProviders oauthProviders;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Test
    void 소셜_로그인_할_수있다() {
        //given
        OauthTokenRequest request = new OauthTokenRequest("", "test");
        String providerName = "kakao";
        String kakaoMail = "test@kakao.com";
        given(oauthProviders.getIdToken(refEq(request), refEq(providerName)))
                .willReturn(new TestToken(kakaoMail));

        //when
        String token = oauthService.generateToken(request, providerName);

        //then
        String email = jwtTokenProvider.getSubject(token);
        Assertions.assertThat(email).isEqualTo(kakaoMail);
    }
}
