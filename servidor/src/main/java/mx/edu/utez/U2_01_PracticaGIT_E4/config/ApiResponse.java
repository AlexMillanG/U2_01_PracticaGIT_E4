package mx.edu.utez.U2_01_PracticaGIT_E4.config;

import org.springframework.http.HttpStatus;

public class ApiResponse {
    private Object data;
    private HttpStatus status;  // Mantenemos HttpStatus
    private Boolean error;

    public ApiResponse(Object data, HttpStatus status, Boolean error) {
        this.data = data;
        this.status = status;
        this.error = error;
    }

    // Getters modificados para serialización correcta
    public Object getData() {
        return data;
    }

    // Devuelve el nombre del status (ej. "OK") en lugar del objeto
    public String getStatus() {
        return status.name();
    }

    // Devuelve el código numérico del status (ej. 200)
    public int getStatusCode() {
        return status.value();
    }

    public Boolean isError() {
        return error;
    }
}