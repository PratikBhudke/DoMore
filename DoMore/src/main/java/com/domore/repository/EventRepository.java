package com.domore.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.domore.model.Event;
import com.domore.model.User;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByUser(User user);
    void deleteByIdAndUser(Long id, User user);
} 