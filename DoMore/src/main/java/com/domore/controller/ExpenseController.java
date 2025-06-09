package com.domore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.domore.model.Expense;
import com.domore.service.ExpenseService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.math.BigDecimal;
import java.util.HashMap;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ExpenseController {
    
    @Autowired
    private ExpenseService expenseService;
    
    // Create expense
    @PostMapping
    public ResponseEntity<Expense> createExpense(@Valid @RequestBody Expense expense) {
        Expense newExpense = expenseService.createExpense(expense);
        return ResponseEntity.ok(newExpense);
    }
    
    // Get all expenses
    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        List<Expense> expenses = expenseService.getAllExpenses();
        return ResponseEntity.ok(expenses);
    }
    
    // Get expense by id
    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
        return expenseService.getExpenseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Update expense
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @Valid @RequestBody Expense expense) {
        Expense updatedExpense = expenseService.updateExpense(id, expense);
        if (updatedExpense != null) {
            return ResponseEntity.ok(updatedExpense);
        }
        return ResponseEntity.notFound().build();
    }
    
    // Delete expense
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.ok().build();
    }
    
    // Get expenses by date range
    @GetMapping("/date-range")
    public ResponseEntity<List<Expense>> getExpensesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<Expense> expenses = expenseService.getExpensesByDateRange(startDate, endDate);
        return ResponseEntity.ok(expenses);
    }
    
    // Get expenses by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Expense>> getExpensesByCategory(@PathVariable String category) {
        List<Expense> expenses = expenseService.getExpensesByCategory(category);
        return ResponseEntity.ok(expenses);
    }
    
    // Get expenses by payment method
    @GetMapping("/payment-method/{paymentMethod}")
    public ResponseEntity<List<Expense>> getExpensesByPaymentMethod(@PathVariable String paymentMethod) {
        List<Expense> expenses = expenseService.getExpensesByPaymentMethod(paymentMethod);
        return ResponseEntity.ok(expenses);
    }
    
    // Get total expenses
    @GetMapping("/total")
    public ResponseEntity<Map<String, BigDecimal>> getTotalExpenses() {
        BigDecimal total = expenseService.calculateTotalExpenses();
        Map<String, BigDecimal> response = new HashMap<>();
        response.put("total", total);
        return ResponseEntity.ok(response);
    }
    
    // Get total expenses by category
    @GetMapping("/total/category/{category}")
    public ResponseEntity<Map<String, BigDecimal>> getTotalExpensesByCategory(@PathVariable String category) {
        BigDecimal total = expenseService.calculateTotalExpensesByCategory(category);
        Map<String, BigDecimal> response = new HashMap<>();
        response.put("total", total);
        return ResponseEntity.ok(response);
    }
    
    // Get total expenses by date range
    @GetMapping("/total/date-range")
    public ResponseEntity<Map<String, BigDecimal>> getTotalExpensesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        BigDecimal total = expenseService.calculateTotalExpensesByDateRange(startDate, endDate);
        Map<String, BigDecimal> response = new HashMap<>();
        response.put("total", total);
        return ResponseEntity.ok(response);
    }
} 