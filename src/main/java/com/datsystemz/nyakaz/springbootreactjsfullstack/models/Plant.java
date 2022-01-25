package com.datsystemz.nyakaz.springbootreactjsfullstack.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity()
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    @ManyToOne()
    @JsonBackReference(value = "locationReference")
    private Location location;

    private int quantity;
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference(value = "userReference")
    private User user;

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

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Long getLocationId() {
        return location != null ? location.getId() : null;
    }

    public void updateLocation() {
        location.addPlant(this);
    }

    public void removeLocation() {
        this.getLocation().removePlant(this);
        this.setLocation(null);
    }

    public void removeUser() {
        this.getUser().removePlant(this);
        this.setUser(null);
    }
}
