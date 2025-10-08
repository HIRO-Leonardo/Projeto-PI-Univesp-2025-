package com.microsservices.user.controller;

import com.microsservices.user.config.TokenConfig;
import com.microsservices.user.dtos.response.LoginResponse;
import com.microsservices.user.dtos.response.RegisterUserResponse;
import com.microsservices.user.dtos.resquest.LoginResquest;
import com.microsservices.user.dtos.resquest.RegisterUserRequest;
import com.microsservices.user.models.UserModels;
import com.microsservices.user.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.132:3000"})

public class AuthController {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;

    private final TokenConfig tokenConfig;

    public AuthController(PasswordEncoder passwordEncoder, UserRepository userRepository, AuthenticationManager authenticationManager, TokenConfig tokenConfig) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.tokenConfig = tokenConfig;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginResquest request) {
        UsernamePasswordAuthenticationToken userAndPass = new UsernamePasswordAuthenticationToken(request.email(), request.password());
        Authentication authentication = authenticationManager.authenticate(userAndPass);

        UserModels userModels = (UserModels) authentication.getPrincipal();
        String token = tokenConfig.generateToken(userModels);

        return ResponseEntity.ok(new LoginResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponse> register(@Valid @RequestBody RegisterUserRequest registerUserRequest) {
        UserModels userModels = new UserModels();
        userModels.setPassword(passwordEncoder.encode(registerUserRequest.password()));
        userModels.setEmail(registerUserRequest.email());
        userModels.setName(registerUserRequest.name());
        userRepository.save(userModels);

        return ResponseEntity.status(HttpStatus.CREATED).body(new RegisterUserResponse(userModels.getName(), userModels.getEmail()));
        
    }
}
