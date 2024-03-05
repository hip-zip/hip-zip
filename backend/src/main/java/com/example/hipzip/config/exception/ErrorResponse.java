package com.example.hipzip.config.exception;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.HttpStatus;

public record ErrorResponse(
        LocalDateTime timeStamp,
        int statusCode,
        String message,
        List<FieldErrorResponse> errorList
) {
    static ErrorResponse create(HttpStatus statusCode, String message) {
        return new ErrorResponse(LocalDateTime.now(), statusCode.value(), message, new ArrayList<>());
    }

    static ErrorResponse create(HttpStatus statusCode, String message, List<FieldErrorResponse> errorList) {
        return new ErrorResponse(LocalDateTime.now(), statusCode.value(), message, errorList);
    }

    public record FieldErrorResponse(String field, String value, String message) {
    }
}
