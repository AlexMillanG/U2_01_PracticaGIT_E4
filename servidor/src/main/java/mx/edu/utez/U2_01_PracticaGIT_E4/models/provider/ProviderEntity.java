package mx.edu.utez.U2_01_PracticaGIT_E4.models.provider;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import mx.edu.utez.U2_01_PracticaGIT_E4.models.car.CarEntity;


@Entity
@Table(name = "provider")
public class ProviderEntity {
    //nombre completo telefono correo
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 100, nullable = false)
    private String name;
    @Column(length = 100, nullable = false)
    private String surname;
    @Column(length = 100, nullable = false)
    private String lastname;
    @Column(length = 100, nullable = false)
    private String phoneNumber;
    @Column(length = 100, nullable = false)
    private String email;

    @JsonManagedReference
    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CarEntity> cars;



    public ProviderEntity(){

    }

    public ProviderEntity(Long id, String name, String surname, String lastname, String phoneNumber, String email){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.lastname = lastname;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }


    public List<CarEntity> getCars() {
        return cars;
    }

    public void setCars(List<CarEntity> cars) {
        this.cars = cars;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    
    public void setName(String name){
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }
    
    public void setSurname(String surname){
        this.surname = surname;
    }

    public String getLastname() {
        return lastname;
    }
    
    public void setLastname(String lastname){
        this.lastname = lastname;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setPhoneNumber(String phoneNumber){
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email){
        this.email = email;
    }

}
