package com.domore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.domore.model.Expense;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByDateBetweenOrderByDateDesc(LocalDate startDate, LocalDate endDate);
    List<Expense> findByCategory(String category);
    List<Expense> findByPaymentMethod(String paymentMethod);
    List<Expense> findAllByOrderByDateDesc();
} 