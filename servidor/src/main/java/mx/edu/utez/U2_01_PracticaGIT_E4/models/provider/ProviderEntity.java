package mx.edu.utez.U2_01_PracticaGIT_E4.models.provider;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "provider")
public class ProviderEntity {
    //nombre completo telefono correo
    
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

    public ProviderEntity(){

    }

    public ProviderEntity(Long id, String name, String surname, String lastname, String phoneNumber, String email){
        
    }

    
}
