package com.microsservices.user.dtos.resquest;

import jakarta.validation.constraints.NotEmpty;

public record LoginResquest(@NotEmpty(message = "Email é obrigatório!!") String email,
                            @NotEmpty(message = "Senha é obrigatório!!") String password) {
}
