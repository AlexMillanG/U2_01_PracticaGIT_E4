package mx.edu.utez.U2_01_PracticaGIT_E4.services.provider;
import mx.edu.utez.U2_01_PracticaGIT_E4.models.provider.ProviderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;

@Service
@Transactional(rollbackFor = SQLException.class)
public class ProviderService {

    private final ProviderRepository providerRepository;

    public ProviderService(ProviderRepository providerRepository){
        this.providerRepository = providerRepository;
    }
    
}
