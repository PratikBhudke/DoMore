package com.domore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.domore.model.Expense;
import com.domore.repository.ExpenseRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.math.BigDecimal;

@Service
public class ExpenseService {
    
    @Autowired
    private ExpenseRepository expenseRepository;
    
    // Create a new expense
    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }
    
    // Get all expenses ordered by date
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAllByOrderByDateDesc();
    }
    
    // Get expense by id
    public Optional<Expense> getExpenseById(Long id) {
        return expenseRepository.findById(id);
    }
    
    // Update expense
    public Expense updateExpense(Long id, Expense expenseDetails) {
        Optional<Expense> expense = expenseRepository.findById(id);
        if (expense.isPresent()) {
            Expense existingExpense = expense.get();
            existingExpense.setDescription(expenseDetails.getDescription());
            existingExpense.setAmount(expenseDetails.getAmount());
            existingExpense.setCategory(expenseDetails.getCategory());
            existingExpense.setDate(expenseDetails.getDate());
            existingExpense.setPaymentMethod(expenseDetails.getPaymentMethod());
            return expenseRepository.save(existingExpense);
        }
        return null;
    }
    
    // Delete expense
    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }
    
    // Get expenses by date range
    public List<Expense> getExpensesByDateRange(LocalDate startDate, LocalDate endDate) {
        return expenseRepository.findByDateBetweenOrderByDateDesc(startDate, endDate);
    }
    
    // Get expenses by category
    public List<Expense> getExpensesByCategory(String category) {
        return expenseRepository.findByCategory(category);
    }
    
    // Get expenses by payment method
    public List<Expense> getExpensesByPaymentMethod(String paymentMethod) {
        return expenseRepository.findByPaymentMethod(paymentMethod);
    }
    
    // Calculate total expenses
    public BigDecimal calculateTotalExpenses() {
        return getAllExpenses().stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    
    // Calculate total expenses by category
    public BigDecimal calculateTotalExpensesByCategory(String category) {
        return getExpensesByCategory(category).stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    
    // Calculate total expenses by date range
    public BigDecimal calculateTotalExpensesByDateRange(LocalDate startDate, LocalDate endDate) {
        return getExpensesByDateRange(startDate, endDate).stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
} 