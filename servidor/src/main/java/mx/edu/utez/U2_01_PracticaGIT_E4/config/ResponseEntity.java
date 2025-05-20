package mx.edu.utez.U2_01_PracticaGIT_E4.config;

import org.springframework.http.HttpStatus;

public class ResponseEntity {

    private Object data;
    private HttpStatus status;
    private Boolean error;


    public ResponseEntity(Object data, HttpStatus status, Boolean error) {
        this.data = data;
        this.status = status;
        this.error = error;
    }
}
