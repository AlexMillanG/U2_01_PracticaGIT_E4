package mx.edu.utez.U2_01_PracticaGIT_E4.services.provider;
import mx.edu.utez.U2_01_PracticaGIT_E4.config.ApiResponse;
import mx.edu.utez.U2_01_PracticaGIT_E4.models.provider.ProviderEntity;
import mx.edu.utez.U2_01_PracticaGIT_E4.models.provider.ProviderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;

@Service
@Transactional(rollbackFor = SQLException.class)
public class ProviderService {

    @Autowired
    private final ProviderRepository providerRepository;

    public ProviderService(ProviderRepository providerRepository){
        this.providerRepository = providerRepository;
    }

    @Transactional(rollbackFor = SQLException.class)
    public ResponseEntity<ApiResponse> findAll(){
        List<ProviderEntity> providers = providerRepository.findAll();

        ApiResponse response = new ApiResponse(
            providers,
            HttpStatus.OK,
            false
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    //findOne, save, delete, update
    public ResponseEntity<ApiResponse> save(ProviderEntity provider) {
        try {
            ProviderEntity savedProvider = providerRepository.save(provider);
            ApiResponse response = new ApiResponse(savedProvider, HttpStatus.OK, false);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse errorResponse = new ApiResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, true);
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

public ResponseEntity<ApiResponse> update(ProviderEntity provider) {
    if (!providerRepository.existsById(provider.getId())) {
        return new ResponseEntity<>(
            new ApiResponse("Proveedor no encontrado para actualizar", HttpStatus.NOT_FOUND, true),
            HttpStatus.NOT_FOUND
        );
    }

    ProviderEntity updated = providerRepository.save(provider);
    return new ResponseEntity<>(
        new ApiResponse(updated, HttpStatus.OK, false),
        HttpStatus.OK
    );
}

public ResponseEntity<ApiResponse> delete(Long id) {
    if (!providerRepository.existsById(id)) {
        return new ResponseEntity<>(
            new ApiResponse("Proveedor no encontrado para eliminar", HttpStatus.NOT_FOUND, true),
            HttpStatus.NOT_FOUND
        );
    }

    providerRepository.deleteById(id);
    return new ResponseEntity<>(
        new ApiResponse("Proveedor eliminado correctamente", HttpStatus.OK, false),
        HttpStatus.OK
    );
}

public ResponseEntity<ApiResponse> findOne(Long id) {
    return providerRepository.findById(id)
        .map(provider -> new ResponseEntity<>(
                new ApiResponse(provider, HttpStatus.OK, false),
                HttpStatus.OK
        ))
        .orElseGet(() -> new ResponseEntity<>(
                new ApiResponse("Proveedor no encontrado", HttpStatus.NOT_FOUND, true),
                HttpStatus.NOT_FOUND
        ));
}

}
