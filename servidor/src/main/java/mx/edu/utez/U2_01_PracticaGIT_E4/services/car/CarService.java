package mx.edu.utez.U2_01_PracticaGIT_E4.services.car;

import mx.edu.utez.U2_01_PracticaGIT_E4.config.ApiResponse;
import mx.edu.utez.U2_01_PracticaGIT_E4.models.car.CarRepository;
import mx.edu.utez.U2_01_PracticaGIT_E4.models.car.CarWithProviderDto;
import mx.edu.utez.U2_01_PracticaGIT_E4.models.provider.ProviderEntity;
import mx.edu.utez.U2_01_PracticaGIT_E4.models.provider.ProviderRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;

import mx.edu.utez.U2_01_PracticaGIT_E4.models.car.CarEntity;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(rollbackFor = SQLException.class)
public class CarService {

    private final CarRepository carRepository;

    private final ProviderRepository providerRepository;


    public CarService(CarRepository carRepository, ProviderRepository providerRepository) {
        this.carRepository = carRepository;
        this.providerRepository = providerRepository;
    }

    public ResponseEntity<ApiResponse> findAll() {
        List<CarEntity> cars = carRepository.findAll();
        List<CarWithProviderDto> carDtos = cars.stream()
                .map(CarWithProviderDto::new)
                .collect(Collectors.toList());
        return new ResponseEntity<>(new ApiResponse(carDtos, HttpStatus.OK, false), HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse> findOne(Long id) {
        Optional<CarEntity> optionalCar = carRepository.findById(id);
        if (optionalCar.isPresent()) {
            CarWithProviderDto carDto = new CarWithProviderDto(optionalCar.get());
            return new ResponseEntity<>(new ApiResponse(carDto, HttpStatus.OK, false), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse("Car not found", HttpStatus.NOT_FOUND, true), HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<ApiResponse> save(CarEntity car) {
        if (car.getPlate() == null || car.getPlate().isEmpty()) {
            return new ResponseEntity<>(new ApiResponse("Plate is required", HttpStatus.BAD_REQUEST, true), HttpStatus.BAD_REQUEST);
        }

        Optional<CarEntity> existing = carRepository.findByPlate(car.getPlate());
        if (existing.isPresent()) {
            return new ResponseEntity<>(new ApiResponse("Car with the same plate already exists", HttpStatus.CONFLICT, true), HttpStatus.CONFLICT);
        }

        if (car.getModel() == null || car.getModel().isEmpty()) {
            return new ResponseEntity<>(new ApiResponse("Model is required", HttpStatus.BAD_REQUEST, true), HttpStatus.BAD_REQUEST);
        }

        if (car.getBrand() == null || car.getBrand().isEmpty()) {
            return new ResponseEntity<>(new ApiResponse("Brand is required", HttpStatus.BAD_REQUEST, true), HttpStatus.BAD_REQUEST);
        }

        Optional<ProviderEntity> foundProvider = providerRepository.findById(car.getProvider().getId());

        if (foundProvider.isEmpty()){
            return new ResponseEntity<>(new ApiResponse("el proveedor proporcionado no existe", HttpStatus.NOT_FOUND, true), HttpStatus.NOT_FOUND);
        }

        CarEntity car1 = carRepository.save(car);

        car1.setProvider(foundProvider.get());
        return new ResponseEntity<>(new ApiResponse(car1, HttpStatus.CREATED, false), HttpStatus.CREATED);
    }

    public ResponseEntity<ApiResponse> update(CarEntity car) {

        Optional<CarEntity> foundCar = carRepository.findById(car.getId());

        if (foundCar.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse("Car not found", HttpStatus.NOT_FOUND, true), HttpStatus.NOT_FOUND);
        }

        if (car.getPlate() == null || car.getPlate().isEmpty()) {
            return new ResponseEntity<>(new ApiResponse("Plate is required", HttpStatus.BAD_REQUEST, true), HttpStatus.BAD_REQUEST);
        }

        Optional<CarEntity> existing = carRepository.findByPlate(car.getPlate());
        if (existing.isPresent() && !existing.get().getId().equals(car.getId())) {
            return new ResponseEntity<>(new ApiResponse("Car with the same plate already exists", HttpStatus.CONFLICT, true), HttpStatus.CONFLICT);
        }

        if (car.getModel() == null || car.getModel().isEmpty()) {
            return new ResponseEntity<>(new ApiResponse("Model is required", HttpStatus.BAD_REQUEST, true), HttpStatus.BAD_REQUEST);
        }

        if (car.getBrand() == null || car.getBrand().isEmpty()) {
            return new ResponseEntity<>(new ApiResponse("Brand is required", HttpStatus.BAD_REQUEST, true), HttpStatus.BAD_REQUEST);
        }

        if (car.getProvider() == null || car.getProvider().getId() == null) {
            return new ResponseEntity<>(new ApiResponse("Provider is required", HttpStatus.BAD_REQUEST, true), HttpStatus.BAD_REQUEST);
        }

        Optional<ProviderEntity> foundProvider = providerRepository.findById(car.getProvider().getId());

        if (foundProvider.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse("The provided provider does not exist", HttpStatus.NOT_FOUND, true), HttpStatus.NOT_FOUND);
        }

        CarEntity car1 = carRepository.save(car);

        car1.setProvider(foundProvider.get());

        return new ResponseEntity<>(new ApiResponse(car1, HttpStatus.OK, false), HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse> delete(Long id){
        Optional<CarEntity> optionalCar = carRepository.findById(id);
        if (optionalCar.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse("Car not found", HttpStatus.NOT_FOUND, true), HttpStatus.NOT_FOUND);
        }

        CarEntity car = optionalCar.get();
        carRepository.delete(optionalCar.get());

        return new ResponseEntity<>(new ApiResponse(car, HttpStatus.OK, false), HttpStatus.OK);
    }





}
