package com.domore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.domore.model.Income;
import com.domore.model.User;
import com.domore.repository.IncomeRepository;
import com.domore.exception.ResourceNotFoundException;
import com.domore.exception.UnauthorizedAccessException;
import java.time.LocalDate;
import java.util.List;
import java.math.BigDecimal;

@Service
@Transactional
public class IncomeService {
    
    @Autowired
    private IncomeRepository incomeRepository;
    
    // Create a new income
    public Income createIncome(Income income) {
        return incomeRepository.save(income);
    }
    
    // Get all incomes
    public List<Income> getAllIncomes() {
        return incomeRepository.findAll();
    }
    
    // Get income by id
    public Income getIncomeById(Long id) {
        return incomeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Income not found with id: " + id));
    }
    
    // Update income
    public Income updateIncome(Long id, Income incomeDetails) {
        Income income = getIncomeById(id);
        income.setSource(incomeDetails.getSource());
        income.setAmount(incomeDetails.getAmount());
        income.setDate(incomeDetails.getDate());
        income.setDescription(incomeDetails.getDescription());
        return incomeRepository.save(income);
    }
    
    // Delete income
    public void deleteIncome(Long id) {
        Income income = getIncomeById(id);
        incomeRepository.delete(income);
    }
    
    // Get all incomes for a user
    public List<Income> getAllIncomesByUser(User user) {
        return incomeRepository.findByUserOrderByDateDesc(user);
    }
    
    // Get income by id and user
    public Income getIncomeByIdAndUser(Long id, User user) {
        Income income = incomeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Income not found with id: " + id));
            
        if (!income.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedAccessException("You don't have permission to access this income");
        }
        
        return income;
    }
    
    // Get incomes by date range for a user
    public List<Income> getIncomesByDateRangeAndUser(LocalDate startDate, LocalDate endDate, User user) {
        return incomeRepository.findByUserAndDateBetweenOrderByDateDesc(user, startDate, endDate);
    }
    
    // Calculate total income for a user
    public BigDecimal calculateTotalIncomeByUser(User user) {
        BigDecimal total = incomeRepository.calculateTotalIncomeByUser(user);
        return total != null ? total : BigDecimal.ZERO;
    }
    
    // Calculate total income by date range for a user
    public BigDecimal calculateTotalIncomeByUserAndDateRange(User user, LocalDate startDate, LocalDate endDate) {
        BigDecimal total = incomeRepository.calculateTotalIncomeByUserAndDateRange(user, startDate, endDate);
        return total != null ? total : BigDecimal.ZERO;
    }
    
    // Search incomes by source for a user
    public List<Income> searchIncomesBySourceAndUser(String source, User user) {
        return incomeRepository.findByUserAndSourceContainingIgnoreCaseOrderByDateDesc(user, source);
    }

    // Get incomes by date range
    public List<Income> getIncomesByDateRange(LocalDate startDate, LocalDate endDate) {
        return incomeRepository.findByDateBetweenOrderByDateDesc(startDate, endDate);
    }

    // Calculate total income
    public BigDecimal calculateTotalIncome() {
        List<Income> allIncomes = getAllIncomes();
        return allIncomes.stream()
            .map(Income::getAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // Calculate total income by date range
    public BigDecimal calculateTotalIncomeByDateRange(LocalDate startDate, LocalDate endDate) {
        List<Income> incomes = getIncomesByDateRange(startDate, endDate);
        return incomes.stream()
            .map(Income::getAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // Search incomes by source
    public List<Income> searchIncomesBySource(String source) {
        return incomeRepository.findBySourceContainingIgnoreCaseOrderByDateDesc(source);
    }
} 