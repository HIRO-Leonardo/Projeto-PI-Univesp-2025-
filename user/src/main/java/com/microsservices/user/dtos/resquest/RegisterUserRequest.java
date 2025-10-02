package com.microsservices.user.dtos.resquest;

import jakarta.validation.constraints.NotEmpty;

public record RegisterUserRequest(@NotEmpty(message = "Nome é obrigatório" ) String name,
                                  @NotEmpty(message = "Email é obrigatório" ) String email,
                                  @NotEmpty(message = "Senha é obrigatório" ) String password) {
}
