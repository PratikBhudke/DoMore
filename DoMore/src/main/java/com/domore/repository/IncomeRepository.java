package com.domore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.domore.model.Income;
import com.domore.model.User;
import java.time.LocalDate;
import java.util.List;
import java.math.BigDecimal;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {
    // User-specific queries
    List<Income> findByUserOrderByDateDesc(User user);
    List<Income> findByUserAndDateBetweenOrderByDateDesc(User user, LocalDate startDate, LocalDate endDate);
    List<Income> findByUserAndSourceContainingIgnoreCaseOrderByDateDesc(User user, String source);
    
    // General queries without user
    List<Income> findByDateBetweenOrderByDateDesc(LocalDate startDate, LocalDate endDate);
    List<Income> findBySourceContainingIgnoreCaseOrderByDateDesc(String source);
    List<Income> findAllByOrderByDateDesc();
    
    // Calculations for user-specific data
    @Query("SELECT SUM(i.amount) FROM Income i WHERE i.user = :user")
    BigDecimal calculateTotalIncomeByUser(@Param("user") User user);
    
    @Query("SELECT SUM(i.amount) FROM Income i WHERE i.user = :user AND i.date BETWEEN :startDate AND :endDate")
    BigDecimal calculateTotalIncomeByUserAndDateRange(
        @Param("user") User user,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
    );
    
    // General calculations without user
    @Query("SELECT SUM(i.amount) FROM Income i")
    BigDecimal calculateTotalIncome();
    
    @Query("SELECT SUM(i.amount) FROM Income i WHERE i.date BETWEEN :startDate AND :endDate")
    BigDecimal calculateTotalIncomeByDateRange(
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
    );
    
    boolean existsByIdAndUser(Long id, User user);
} 