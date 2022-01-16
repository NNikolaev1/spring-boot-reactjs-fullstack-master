package com.datsystemz.nyakaz.springbootreactjsfullstack.controllers;


import com.datsystemz.nyakaz.springbootreactjsfullstack.exceptions.ResourceNotFoundException;
import com.datsystemz.nyakaz.springbootreactjsfullstack.models.Plant;
import com.datsystemz.nyakaz.springbootreactjsfullstack.repositories.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/plant")
public class PlantController {
    private PlantRepository plantRepository;

    @Autowired
    public PlantController(PlantRepository plantRepository) {
        this.plantRepository = plantRepository;
    }

    @PostMapping("/save")
    @ResponseBody
    public Plant savePlant(@RequestBody Plant plant) {
        return this.plantRepository.save(plant);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Plant>> getPlants() {
        return ResponseEntity.ok(
                this.plantRepository.findAll()
        );
    }

    @GetMapping("/unassigned")
    public ResponseEntity<List<Plant>> getUnassignedPlants() {
        return ResponseEntity.ok(
                this.plantRepository.findAllByUserIsNull()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plant> getPlant(@PathVariable(value = "id") Long id) {
        Plant plant = this.plantRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Plant not found")
        );

        return ResponseEntity.ok().body(plant);
    }

    @PutMapping("/{id}")
    public Plant updatePlant(@RequestBody Plant newPlant, @PathVariable(value = "id") Long id) {
        return this.plantRepository.findById(id)
                .map(plant -> {
                    plant.setName(newPlant.getName());
                    plant.setLocation(newPlant.getLocation());
                    plant.setQuantity(newPlant.getQuantity());
                    return this.plantRepository.save(plant);
                })
                .orElseGet(() -> {
                    newPlant.setId(id);
                    return this.plantRepository.save(newPlant);
                });
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removePlant(@PathVariable(value = "id") Long id) {
        Plant plant = this.plantRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Plant not found" + id)
        );

        if (Objects.nonNull(plant.getUser())) {
            plant.getUser().getPlants().remove(plant);
        }

        this.plantRepository.delete(plant);
        return ResponseEntity.ok().build();
    }
}
