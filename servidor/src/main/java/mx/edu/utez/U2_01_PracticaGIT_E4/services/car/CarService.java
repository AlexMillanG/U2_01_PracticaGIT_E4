package mx.edu.utez.U2_01_PracticaGIT_E4.services.car;

import mx.edu.utez.U2_01_PracticaGIT_E4.models.car.CarRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;

@Service
@Transactional(rollbackFor = SQLException.class)
public class CarService {

    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }



}
