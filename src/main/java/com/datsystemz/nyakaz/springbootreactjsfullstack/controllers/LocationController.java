package com.datsystemz.nyakaz.springbootreactjsfullstack.controllers;

import com.datsystemz.nyakaz.springbootreactjsfullstack.exceptions.ResourceNotFoundException;
import com.datsystemz.nyakaz.springbootreactjsfullstack.models.Location;
import com.datsystemz.nyakaz.springbootreactjsfullstack.models.Plant;
import com.datsystemz.nyakaz.springbootreactjsfullstack.repositories.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/location")
public class LocationController {
    private LocationRepository locationRepository;

    @Autowired
    public LocationController(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @PostMapping("/save")
    @ResponseBody
    public Location saveLocation(@RequestBody Location location) {
        return this.locationRepository.save(location);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Location>> getLocations() {
        return ResponseEntity.ok(
                this.locationRepository.findAll()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Location> getLocation(@PathVariable(value = "id") Long id) {
        Location location = this.locationRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Location not found")
        );

        return ResponseEntity.ok().body(location);
    }

    @PutMapping("/{id}")
    public Location updateLocation(@RequestBody Plant plant, @PathVariable(value = "id") Long id) {
        Location location;
        location = this.locationRepository.findById(id).get();
        location.addPlant(plant);

        this.locationRepository.save(location);
        return location;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeLocation(@PathVariable(value = "id") Long id) {
        Location location = this.locationRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Location not found" + id)
        );

        location.getPlants().forEach(Plant::removeLocation);
        this.locationRepository.delete(location);
        return ResponseEntity.ok().build();
    }
}
