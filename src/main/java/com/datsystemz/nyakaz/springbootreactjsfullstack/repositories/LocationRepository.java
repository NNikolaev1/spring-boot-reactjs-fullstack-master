package com.datsystemz.nyakaz.springbootreactjsfullstack.repositories;

import com.datsystemz.nyakaz.springbootreactjsfullstack.models.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location,Long> {
}
