package mx.edu.utez.U2_01_PracticaGIT_E4.models.car;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import mx.edu.utez.U2_01_PracticaGIT_E4.models.provider.ProviderEntity;

@Entity
@Table(name = "cars")
public class CarEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String model;
    private String brand;
    private String plate;

    @ManyToOne
    @JoinColumn(name = "proveedor_id")
    @JsonBackReference
    private ProviderEntity provider;

    public CarEntity() {
    }

    public CarEntity(Long id, String model, String brand, String plate) {
        this.id = id;
        this.model = model;
        this.brand = brand;
        this.plate = plate;
    }

    // Getters y setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getPlate() {
        return plate;
    }

    public void setPlate(String plate) {
        this.plate = plate;
    }

    public ProviderEntity getProvider() {
        return provider;
    }

    public void setProvider(ProviderEntity provider) {
        this.provider = provider;
    }
}
