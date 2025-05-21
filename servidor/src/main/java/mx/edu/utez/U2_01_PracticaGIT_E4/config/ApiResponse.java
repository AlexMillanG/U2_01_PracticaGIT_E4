package mx.edu.utez.U2_01_PracticaGIT_E4.config;

import org.springframework.http.HttpStatus;

public class ApiResponse {

    private Object data;
    private HttpStatus status;
    private Boolean error;


    public ApiResponse(Object data, HttpStatus status, Boolean error) {
        this.data = data;
        this.status = status;
        this.error = error;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public Boolean getError() {
        return error;
    }

    public void setError(Boolean error) {
        this.error = error;
    }
}
