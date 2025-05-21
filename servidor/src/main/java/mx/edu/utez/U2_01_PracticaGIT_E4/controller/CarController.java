package mx.edu.utez.U2_01_PracticaGIT_E4.controller;

import mx.edu.utez.U2_01_PracticaGIT_E4.config.ApiResponse;
import mx.edu.utez.U2_01_PracticaGIT_E4.models.car.CarEntity;
import mx.edu.utez.U2_01_PracticaGIT_E4.services.car.CarService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/cars")
public class CarController {

    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping("/")
    public ResponseEntity<ApiResponse> findAll(){
        return carService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse>findOne(@PathVariable Long id){
        return carService.findOne(id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse>delete(@PathVariable Long id){
        return carService.delete(id);
    }

    @PostMapping("/save")
    public ResponseEntity<ApiResponse> save(@RequestBody CarEntity car){
        return carService.save(car);
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> update(@RequestBody CarEntity car){
        return carService.update(car);
    }

}
