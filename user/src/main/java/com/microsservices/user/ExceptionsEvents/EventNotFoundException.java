package com.microsservices.user.ExceptionsEvents;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EventNotFoundException extends RuntimeException {
     public EventNotFoundException() {super("Pedido not found");}

    public EventNotFoundException(String message) {super(message);}
}
