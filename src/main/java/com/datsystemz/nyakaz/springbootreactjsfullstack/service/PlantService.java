package com.datsystemz.nyakaz.springbootreactjsfullstack.service;

import com.datsystemz.nyakaz.springbootreactjsfullstack.models.Plant;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class PlantService {
    private static int QUANTITY_INCREASE_STEP = 1;

    public void increasePlantQuantity(Plant plant) {
        if (Objects.nonNull(plant)) {
            plant.setQuantity(plant.getQuantity() + QUANTITY_INCREASE_STEP);
        }
    }
}
