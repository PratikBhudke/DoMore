package com.domore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.domore.model.Income;
import com.domore.service.IncomeService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.math.BigDecimal;
import java.util.HashMap;

@RestController
@RequestMapping("/api/incomes")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class IncomeController {
    
    @Autowired
    private IncomeService incomeService;
    
    // Create income
    @PostMapping
    public ResponseEntity<Income> createIncome(@Valid @RequestBody Income income) {
        Income newIncome = incomeService.createIncome(income);
        return ResponseEntity.ok(newIncome);
    }
    
    // Get all incomes
    @GetMapping
    public ResponseEntity<List<Income>> getAllIncomes() {
        List<Income> incomes = incomeService.getAllIncomes();
        return ResponseEntity.ok(incomes);
    }
    
    // Get income by id
    @GetMapping("/{id}")
    public ResponseEntity<Income> getIncomeById(@PathVariable Long id) {
        Income income = incomeService.getIncomeById(id);
        return ResponseEntity.ok(income);
    }
    
    // Update income
    @PutMapping("/{id}")
    public ResponseEntity<Income> updateIncome(
            @PathVariable Long id,
            @Valid @RequestBody Income income) {
        Income updatedIncome = incomeService.updateIncome(id, income);
        return ResponseEntity.ok(updatedIncome);
    }
    
    // Delete income
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id) {
        incomeService.deleteIncome(id);
        return ResponseEntity.ok().build();
    }
    
    // Get incomes by date range
    @GetMapping("/date-range")
    public ResponseEntity<List<Income>> getIncomesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<Income> incomes = incomeService.getIncomesByDateRange(startDate, endDate);
        return ResponseEntity.ok(incomes);
    }
    
    // Get total income for current user
    @GetMapping("/total")
    public ResponseEntity<Map<String, BigDecimal>> getTotalIncome() {
        BigDecimal total = incomeService.calculateTotalIncome();
        Map<String, BigDecimal> response = new HashMap<>();
        response.put("total", total);
        return ResponseEntity.ok(response);
    }
    
    // Get total income by date range for current user
    @GetMapping("/total/date-range")
    public ResponseEntity<Map<String, BigDecimal>> getTotalIncomeByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        BigDecimal total = incomeService.calculateTotalIncomeByDateRange(startDate, endDate);
        Map<String, BigDecimal> response = new HashMap<>();
        response.put("total", total);
        return ResponseEntity.ok(response);
    }
    
    // Search incomes by source
    @GetMapping("/search")
    public ResponseEntity<List<Income>> searchIncomes(
            @RequestParam String source) {
        List<Income> incomes = incomeService.searchIncomesBySource(source);
        return ResponseEntity.ok(incomes);
    }
} 