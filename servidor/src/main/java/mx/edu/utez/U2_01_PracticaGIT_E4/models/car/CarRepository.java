package mx.edu.utez.U2_01_PracticaGIT_E4.models.car;

import mx.edu.utez.U2_01_PracticaGIT_E4.models.provider.ProviderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CarRepository extends JpaRepository<CarEntity,Long> {

    Optional<CarEntity> findByPlate(String s);

    List<CarEntity> findCarsByProvider(ProviderEntity provider);


}
