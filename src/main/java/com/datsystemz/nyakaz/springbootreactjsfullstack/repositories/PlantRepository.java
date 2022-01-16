package com.datsystemz.nyakaz.springbootreactjsfullstack.repositories;

import com.datsystemz.nyakaz.springbootreactjsfullstack.models.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlantRepository extends JpaRepository<Plant,Long> {
    List<Plant> findAllByUserIsNull();
}
