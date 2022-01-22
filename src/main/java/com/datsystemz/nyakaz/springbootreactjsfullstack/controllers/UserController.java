package com.datsystemz.nyakaz.springbootreactjsfullstack.controllers;

import com.datsystemz.nyakaz.springbootreactjsfullstack.exceptions.ResourceNotFoundException;
import com.datsystemz.nyakaz.springbootreactjsfullstack.models.Plant;
import com.datsystemz.nyakaz.springbootreactjsfullstack.models.User;
import com.datsystemz.nyakaz.springbootreactjsfullstack.repositories.PlantRepository;
import com.datsystemz.nyakaz.springbootreactjsfullstack.repositories.UserRepository;
import com.datsystemz.nyakaz.springbootreactjsfullstack.service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    private UserRepository userRepository;

    @Resource
    private PlantRepository plantRepository;

    @Resource
    private PlantService plantService;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/save")
    @ResponseBody
    public User saveUser(@RequestBody User user) {
        return this.userRepository.save(user);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(
                this.userRepository.findAll()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable(value = "id") Long id) {
        User user = this.userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User not found")
        );

        return ResponseEntity.ok().body(user);
    }

    @PutMapping(value = "/{id}")
    public User updateUser(@RequestBody Plant plant, @PathVariable(value = "id") Long id) {
        User user;
        Plant newPlant;
        if (this.userRepository.findById(id).isPresent() && this.plantRepository.findById(plant.getId()).isPresent()) {
            user = this.userRepository.findById(id).get();
            newPlant = this.plantRepository.findById(plant.getId()).get();
            newPlant.setUser(user);
        } else {
            return null;
        }

        if (Objects.isNull(user.getPlants())) {
            user.setPlants(Collections.singleton(newPlant));
        } else if (user.getPlants().stream().anyMatch(plant1 -> plant1.getId().equals(newPlant.getId()))) {
            return user;
        } else {
            user.getPlants().add(newPlant);
            plantService.increasePlantQuantity(
                    user.getPlants().stream().filter(plant1 -> plant1.equals(newPlant)).findFirst().get());
        }
        this.userRepository.save(user);
        this.plantRepository.save(newPlant);
        return user;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeUser(@PathVariable(value = "id") Long id) {
        User user = this.userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User not found" + id)
        );

        user.getPlants().forEach(plant -> plant.setUser(null));

        this.userRepository.delete(user);
        return ResponseEntity.ok().build();
    }
}
