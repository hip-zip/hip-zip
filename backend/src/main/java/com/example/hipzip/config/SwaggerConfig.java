package com.example.hipzip.config;

import com.example.hipzip.ui.LoginUser;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import java.util.Arrays;
import org.springdoc.core.customizers.OperationCustomizer;
import org.springdoc.core.utils.SpringDocUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    static {
        SpringDocUtils.getConfig()
                .addAnnotationsToIgnore(LoginUser.class);
    }

    @Bean
    public OpenAPI openAPI() {
        SecurityScheme apiKey = new SecurityScheme()
                .type(SecurityScheme.Type.APIKEY)
                .in(SecurityScheme.In.HEADER)
                .name("Authorization");

        Info info = new Info()
                .title("Api Documentation")
                .description("Api Documentation");

        return new OpenAPI()
                .components(new Components())
                .info(info)
                .components(new Components().addSecuritySchemes("Bearer Token", apiKey))
                .addServersItem(new Server().url("/"));
    }

    @Bean
    public OperationCustomizer authOperationMarker() {
        SecurityRequirement securityRequirement = new SecurityRequirement()
                .addList("Bearer Token");

        return (operation, handlerMethod) -> {
            Arrays.stream(handlerMethod.getMethodParameters())
                    .filter(methodParameter -> methodParameter.hasParameterAnnotation(LoginUser.class))
                    .findAny()
                    .ifPresent(
                            it -> operation.addSecurityItem(securityRequirement)
                    );
            return operation;
        };
    }
}
