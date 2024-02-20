package com.example.hipzip.domain.user;


import com.example.hipzip.domain.BaseEntity;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {

    private String email;

    public User(final String email) {
        this.email = email;
    }
}
