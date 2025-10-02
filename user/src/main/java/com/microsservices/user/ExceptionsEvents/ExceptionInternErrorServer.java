package com.microsservices.user.ExceptionsEvents;

import org.springframework.http.HttpStatus;

public class ExceptionInternErrorServer extends RuntimeException {
    public ExceptionInternErrorServer() {super("Problema no servidor");}

    public ExceptionInternErrorServer(String message) {
        super(message);
    }
}
