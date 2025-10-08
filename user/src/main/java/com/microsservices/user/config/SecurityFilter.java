package com.microsservices.user.config;

import com.microsservices.user.dtos.JWTUserData;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.util.Strings;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    private final TokenConfig tokenConfig;

    public SecurityFilter(TokenConfig tokenConfig) {
        this.tokenConfig = tokenConfig;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizeHeader = request.getHeader("Authorization");

        // 1. Lógica de extração do token e autenticação
        if (Strings.isNotEmpty(authorizeHeader) && authorizeHeader.startsWith("Bearer ")) {
            String token = authorizeHeader.substring("Bearer ".length());
            Optional<JWTUserData> optUser = tokenConfig.validateToken(token);

            if (optUser.isPresent()) {
                JWTUserData user = optUser.get();
                // 2. Configura a autenticação no contexto
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList()); // Permissões são nulas aqui

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);

                // 3. NÃO CHAMAR filterChain.doFilter() AQUI
            }
            // 4. Se o token for inválido/expirado, o contexto fica vazio e o
            //    próximo filtro (AuthorizationFilter) irá negar o acesso se a rota for protegida.
        }

        // 5. CORREÇÃO: Chama o próximo filtro da cadeia no final do método, UMA ÚNICA VEZ.
        filterChain.doFilter(request, response);
    }
}

