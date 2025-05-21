package mx.edu.utez.U2_01_PracticaGIT_E4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mx.edu.utez.U2_01_PracticaGIT_E4.config.ApiResponse;
import mx.edu.utez.U2_01_PracticaGIT_E4.models.provider.ProviderEntity;
import mx.edu.utez.U2_01_PracticaGIT_E4.services.provider.ProviderService;

@RestController
@RequestMapping("/api/providers")
@CrossOrigin(origins = "*")
public class ProviderController {
    @Autowired
    private final ProviderService providerService;

    public ProviderController(ProviderService providerService) {
        this.providerService = providerService;
    }

    @GetMapping("/")
    public ResponseEntity<ApiResponse> getAllProviders() {
        return providerService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getProviderById(@PathVariable Long id) {
        return providerService.findOne(id);
    }

    @PostMapping("/save")
    public ResponseEntity<ApiResponse> createProvider(@RequestBody ProviderEntity provider) {
        return providerService.save(provider);
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> updateProvider(
            @RequestBody ProviderEntity provider
    ) {

        return providerService.update(provider);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> deleteProvider(@PathVariable Long id) {
        return providerService.delete(id);
    }
}
