package mx.edu.utez.U2_01_PracticaGIT_E4.models.car;

import mx.edu.utez.U2_01_PracticaGIT_E4.models.provider.ProviderEntity;

public class CarWithProviderDto {
    private Long id;
    private String model;
    private String brand;
    private String plate;
    private ProviderDto provider;

    // Clase DTO interna para el proveedor
    public static class ProviderDto {
        private Long id;
        private String name;
        private String surname;
        private String lastname;
        private String phoneNumber;
        private String email;

        public ProviderDto(ProviderEntity provider) {
            this.id = provider.getId();
            this.name = provider.getName();
            this.surname = provider.getSurname();
            this.lastname = provider.getLastname();
            this.phoneNumber = provider.getPhoneNumber();
            this.email = provider.getEmail();
        }

        // Getters
        public Long getId() {
            return id;
        }

        public String getName() {
            return name;
        }

        public String getSurname() {
            return surname;
        }

        public String getLastname() {
            return lastname;
        }

        public String getPhoneNumber() {
            return phoneNumber;
        }

        public String getEmail() {
            return email;
        }
    }

    // Constructor que convierte CarEntity a DTO
    public CarWithProviderDto(CarEntity car) {
        this.id = car.getId();
        this.model = car.getModel();
        this.brand = car.getBrand();
        this.plate = car.getPlate();
        if (car.getProvider() != null) {
            this.provider = new ProviderDto(car.getProvider());
        }
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getModel() {
        return model;
    }

    public String getBrand() {
        return brand;
    }

    public String getPlate() {
        return plate;
    }

    public ProviderDto getProvider() {
        return provider;
    }
}