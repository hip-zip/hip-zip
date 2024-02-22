package com.example.hipzip.application;

import com.example.hipzip.domain.user.User;
import com.example.hipzip.domain.user.UserRepository;
import com.example.hipzip.infra.IdToken;
import com.example.hipzip.infra.OauthProviders;
import com.example.hipzip.infra.OauthTokenRequest;
import com.example.hipzip.util.JwtTokenProvider;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OauthService {

    private final OauthProviders oauthProviders;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public String generateToken(final OauthTokenRequest request, final String providerName) {
        IdToken idToken = oauthProviders.getIdToken(request, providerName);

        Optional<User> findUser = userRepository.findByEmail(idToken.getEmail());

        User user = findUser.orElseGet(() -> userRepository.save(new User(
                idToken.getEmail(), idToken.getNickName(), idToken.getImage()
        )));

        return jwtTokenProvider.generateToken(user.getEmail());
    }

    public String generateUrl(final String providerName) {
        return oauthProviders.getUrl(providerName);
    }
}
