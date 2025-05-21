package mx.edu.utez.U2_01_PracticaGIT_E4.services.provider;
import mx.edu.utez.U2_01_PracticaGIT_E4.config.ApiResponse;
import mx.edu.utez.U2_01_PracticaGIT_E4.models.car.CarEntity;
import mx.edu.utez.U2_01_PracticaGIT_E4.models.car.CarRepository;
import mx.edu.utez.U2_01_PracticaGIT_E4.models.provider.ProviderEntity;
import mx.edu.utez.U2_01_PracticaGIT_E4.models.provider.ProviderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(rollbackFor = SQLException.class)
public class ProviderService {

    @Autowired
    private final ProviderRepository providerRepository;
    @Autowired
    private final CarRepository carRepository;

    public ProviderService(ProviderRepository providerRepository, CarRepository carRepository) {
        this.providerRepository = providerRepository;
        this.carRepository = carRepository;
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

    return new ResponseEntity<>(new ApiResponse(providerRepository.save(provider), HttpStatus.CREATED, false), HttpStatus.CREATED);
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
        Optional<ProviderEntity> foundProvider = providerRepository.findById(id);

        if (foundProvider.isEmpty()) {
            return new ResponseEntity<>(
                    new ApiResponse("Proveedor no encontrado para eliminar", HttpStatus.NOT_FOUND, true),
                    HttpStatus.NOT_FOUND
            );
        }

        List<CarEntity> cars = carRepository.findCarsByProvider(foundProvider.get());

        if (!cars.isEmpty()) {
            return new ResponseEntity<>(
                    new ApiResponse("No se puede eliminar el proveedor porque tiene autos asignados", HttpStatus.CONFLICT, true),
                    HttpStatus.CONFLICT
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
