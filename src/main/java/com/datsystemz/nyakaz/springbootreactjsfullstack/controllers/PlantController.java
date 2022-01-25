package com.datsystemz.nyakaz.springbootreactjsfullstack.controllers;


import com.datsystemz.nyakaz.springbootreactjsfullstack.exceptions.ResourceNotFoundException;
import com.datsystemz.nyakaz.springbootreactjsfullstack.models.Location;
import com.datsystemz.nyakaz.springbootreactjsfullstack.models.Plant;
import com.datsystemz.nyakaz.springbootreactjsfullstack.repositories.LocationRepository;
import com.datsystemz.nyakaz.springbootreactjsfullstack.repositories.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/plant")
public class PlantController {
    private PlantRepository plantRepository;

    @Resource
    private LocationRepository locationRepository;

    @Autowired
    public PlantController(PlantRepository plantRepository) {
        this.plantRepository = plantRepository;
    }

    @PostMapping(path = "/save")
    @ResponseBody
    public Plant savePlant(@RequestBody Plant plant) {
        plant.getLocation().getPlants().add(plant);
        Plant plant2 = this.plantRepository.save(plant);
        this.locationRepository.save(plant.getLocation());
        return plant2;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Plant>> getPlants() {
        List<Plant> plants = this.plantRepository.findAll();
        return ResponseEntity.ok(plants);
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
    public Plant updatePlantLocation(@RequestBody Location newLocation, @PathVariable(value = "id") Long id) {
        return this.plantRepository.findById(id)
                .map(plant -> {
                    plant.setLocation(newLocation);
                    return this.plantRepository.save(plant);
                })
                .orElse(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removePlant(@PathVariable(value = "id") Long id) {
        Plant plant = this.plantRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Plant not found" + id)
        );

        if (Objects.nonNull(plant.getUser())) {
            plant.removeUser();
        }

        if (Objects.nonNull(plant.getLocation())) {
            plant.removeLocation();
        }

        this.plantRepository.delete(plant);
        return ResponseEntity.ok().build();
    }
}
