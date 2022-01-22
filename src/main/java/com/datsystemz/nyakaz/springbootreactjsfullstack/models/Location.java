package com.datsystemz.nyakaz.springbootreactjsfullstack.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Set;

@Entity()
public class Location {

    @Id()
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private int capacity;
    @OneToMany(mappedBy = "location")
    @JsonManagedReference(value="locationReference")
    private Set<Plant> plants;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public Set<Plant> getPlants() {
        return plants;
    }

    public void setPlants(Set<Plant> plant) {
        this.plants = plant;
    }

    public void addPlant(Plant plant) {
        plants.add(plant);
        plant.setLocation(this);
    }

    public void removePlant(Plant plant) {
        plants.remove(plant);
//        plant.setLocation(this);
    }
}
