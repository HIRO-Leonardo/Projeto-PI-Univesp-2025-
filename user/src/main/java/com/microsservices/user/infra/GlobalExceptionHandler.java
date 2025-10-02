package com.microsservices.user.infra;

import com.microsservices.user.ExceptionsEvents.EventNoSuchElementException;
import com.microsservices.user.ExceptionsEvents.EventNotFoundException;
import com.microsservices.user.ExceptionsEvents.ExceptionInternErrorServer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EventNotFoundException.class)
    private ResponseEntity<RestErrorMessage> handle(EventNotFoundException e) {
        var restError = new RestErrorMessage(HttpStatus.NOT_FOUND, e.getMessage());
        return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(restError);
    }

    @ExceptionHandler(EventNoSuchElementException.class)
    private ResponseEntity<RestErrorMessage> handleNoSuchEventException(EventNotFoundException e) {
        var restError = new RestErrorMessage(HttpStatus.NOT_FOUND, e.getMessage());
        return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(restError);
    }

    @ExceptionHandler(ExceptionInternErrorServer.class)
    private ResponseEntity<RestErrorMessage> handleException(ExceptionInternErrorServer e) {
        var restError = new RestErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(restError);
    }

}
