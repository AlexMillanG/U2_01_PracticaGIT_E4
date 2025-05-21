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
    private ProviderService providerService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllProviders() {
        return providerService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getProviderById(@PathVariable Long id) {
        return providerService.findOne(id);
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createProvider(@RequestBody ProviderEntity provider) {
        return providerService.save(provider);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateProvider(
            @PathVariable Long id,
            @RequestBody ProviderEntity provider
    ) {
        provider.setId(id);
        return providerService.update(provider);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProvider(@PathVariable Long id) {
        return providerService.delete(id);
    }
}
