package com.domore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.domore.model.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    // Add custom query methods if needed
} 