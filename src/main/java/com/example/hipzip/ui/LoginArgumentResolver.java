package com.example.hipzip.ui;

import com.example.hipzip.application.UserService;
import com.example.hipzip.domain.user.User;
import com.example.hipzip.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
@RequiredArgsConstructor
public class LoginArgumentResolver implements HandlerMethodArgumentResolver {

    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer";

    private final JwtTokenProvider provider;
    private final UserService userService;

    @Override
    public boolean supportsParameter(final MethodParameter parameter) {
        return parameter.hasParameterAnnotation(LoginUser.class);
    }

    @Override
    public User resolveArgument(final MethodParameter parameter, final ModelAndViewContainer mavContainer,
                                final NativeWebRequest webRequest, final WebDataBinderFactory binderFactory) {
        String authorization = webRequest.getHeader(AUTHORIZATION);
        if (authorization == null) {
            throw new IllegalArgumentException("토큰이 존재하지 않습니다.");
        }

        String[] token = authorization.split(" ");
        if (token[0] == BEARER) {
            throw new IllegalArgumentException("유효하지 않은 토큰 인증 방식입니다.");
        }

        provider.validate(token[1]);

        String email = provider.getSubject(token[1]);
        return userService.getByEmail(email);
    }
}
