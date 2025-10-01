package com.microsservices.user.ExceptionsEvents;

import java.util.NoSuchElementException;

public class EventNoSuchElementException extends NoSuchElementException {
    public EventNoSuchElementException(String message){
        super(message);
    }
    public EventNoSuchElementException(){
        super("Element not found");
    }

}
