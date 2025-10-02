package com.microsservices.user.controller;

import com.microsservices.user.dtos.response.LoginResponse;
import com.microsservices.user.dtos.response.RegisterUserResponse;
import com.microsservices.user.dtos.resquest.RegisterUserRequest;
import com.microsservices.user.models.UserModels;
import com.microsservices.user.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginResponse loginResponse) {
        return null;
    }


    public ResponseEntity<RegisterUserResponse> register(@Valid @RequestBody RegisterUserRequest registerUserRequest) {
        UserModels userModels = new UserModels();
        userModels.setPassword(registerUserRequest.password());
        userModels.setEmail(registerUserRequest.email());
        userModels.setName(registerUserRequest.name());
        userRepository.save(userModels);

        return ResponseEntity.status(HttpStatus.CREATED).body(new RegisterUserResponse(userModels.getName(), userModels.getEmail()));
        
    }
}
