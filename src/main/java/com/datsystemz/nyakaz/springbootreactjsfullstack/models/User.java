package com.datsystemz.nyakaz.springbootreactjsfullstack.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Set;

@Entity()
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String email;
    private String username;
    private String password;
    @OneToMany()
    @JsonManagedReference(value="userReference")
    private Set<Plant> plants;

    protected User() {
    }

    public User(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Plant> getPlants() {
        return plants;
    }

    public void setPlants(Set<Plant> plants) {
        this.plants = plants;
    }

    public void removePlant(Plant plant) {
        plants.remove(plant);
//        plant.setLocation(this);
    }
}
