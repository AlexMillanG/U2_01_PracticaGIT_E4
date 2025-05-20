package mx.edu.utez.U2_01_PracticaGIT_E4.models.car;

import jakarta.persistence.*;
import mx.edu.utez.U2_01_PracticaGIT_E4.models.provider.ProviderEntity;

@Entity
@Table(name="cars")
public class CarEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String model;
    private String brand;
    private String plate;

    public CarEntity(Long id, String model, String brand, String plate) {
        this.id = id;
        this.model = model;
        this.brand = brand;
        this.plate = plate;
    }

    public CarEntity() {
    }

}
