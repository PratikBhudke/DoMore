import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService, Expense } from '../services/expense.service';
import { IncomeService, Income } from '../services/income.service';

@Component({
  selector: 'app-moneytracker',
  templateUrl: './moneytracker.component.html',
  styleUrls: ['./moneytracker.component.css'],
  standalone: false
})
export class MoneytrackerComponent implements OnInit {
  expenseForm!: FormGroup;
  incomeForm!: FormGroup;
  expenses: Expense[] = [];
  incomes: Income[] = [];
  categories: string[] = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Health & Medical',
    'Education',
    'Travel',
    'Other'
  ];
  paymentMethods: string[] = [
    'Cash',
    'Credit Card',
    'Debit Card',
    'UPI',
    'Net Banking',
    'Other'
  ];
  incomeSources: string[] = [
    'Salary',
    'Freelance',
    'Business',
    'Investment',
    'Other'
  ];
  totalExpenses: number = 0;
  totalIncome: number = 0;
  remainingBalance: number = 0;
  editingExpense: Expense | null = null;
  editingIncome: Income | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';
  activeTab: 'expenses' | 'income' = 'expenses';

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private incomeService: IncomeService
  ) {
    this.initializeForms();
  }

  private initializeForms() {
    this.expenseForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3)]],
      amount: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      date: ['', Validators.required],
      paymentMethod: ['', Validators.required]
    });

    this.incomeForm = this.fb.group({
      source: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadExpenses();
    this.loadIncomes();
  }

  setActiveTab(tab: 'expenses' | 'income') {
    this.activeTab = tab;
  }

  loadExpenses(): void {
    this.isLoading = true;
    this.expenseService.getAllExpenses().subscribe({
      next: (expenses) => {
        this.expenses = expenses;
        this.calculateTotalExpenses();
        this.calculateRemainingBalance();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading expenses:', error);
        this.errorMessage = 'Failed to load expenses. Please try again.';
        this.isLoading = false;
      }
    });
  }

  loadIncomes(): void {
    this.isLoading = true;
    this.incomeService.getAllIncomes().subscribe({
      next: (incomes) => {
        this.incomes = incomes;
        this.calculateTotalIncome();
        this.calculateRemainingBalance();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading incomes:', error);
        this.errorMessage = 'Failed to load incomes. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onSubmitExpense(): void {
    if (this.expenseForm.valid) {
      this.isLoading = true;
      const expenseData = this.expenseForm.value;

      if (this.editingExpense) {
        this.expenseService.updateExpense(this.editingExpense.id!, expenseData).subscribe({
          next: (updatedExpense) => {
            const index = this.expenses.findIndex(e => e.id === this.editingExpense!.id);
            if (index !== -1) {
              this.expenses[index] = updatedExpense;
            }
            this.calculateTotalExpenses();
            this.calculateRemainingBalance();
            this.resetExpenseForm();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error updating expense:', error);
            this.errorMessage = 'Failed to update expense. Please try again.';
            this.isLoading = false;
          }
        });
      } else {
        this.expenseService.createExpense(expenseData).subscribe({
          next: (newExpense) => {
            this.expenses.unshift(newExpense);
            this.calculateTotalExpenses();
            this.calculateRemainingBalance();
            this.resetExpenseForm();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error creating expense:', error);
            this.errorMessage = 'Failed to create expense. Please try again.';
            this.isLoading = false;
          }
        });
      }
    } else {
      this.markFormGroupTouched(this.expenseForm);
    }
  }

  onSubmitIncome(): void {
    if (this.incomeForm.valid) {
      this.isLoading = true;
      const incomeData = this.incomeForm.value;

      if (this.editingIncome) {
        this.incomeService.updateIncome(this.editingIncome.id!, incomeData).subscribe({
          next: (updatedIncome) => {
            const index = this.incomes.findIndex(i => i.id === this.editingIncome!.id);
            if (index !== -1) {
              this.incomes[index] = updatedIncome;
            }
            this.calculateTotalIncome();
            this.calculateRemainingBalance();
            this.resetIncomeForm();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error updating income:', error);
            this.errorMessage = 'Failed to update income. Please try again.';
            this.isLoading = false;
          }
        });
      } else {
        this.incomeService.createIncome(incomeData).subscribe({
          next: (newIncome) => {
            this.incomes.unshift(newIncome);
            this.calculateTotalIncome();
            this.calculateRemainingBalance();
            this.resetIncomeForm();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error creating income:', error);
            this.errorMessage = 'Failed to create income. Please try again.';
            this.isLoading = false;
          }
        });
      }
    } else {
      this.markFormGroupTouched(this.incomeForm);
    }
  }

  editExpense(expense: Expense): void {
    this.editingExpense = expense;
    this.expenseForm.patchValue({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      paymentMethod: expense.paymentMethod
    });
  }

  editIncome(income: Income): void {
    this.editingIncome = income;
    this.incomeForm.patchValue({
      source: income.source,
      amount: income.amount,
      date: income.date,
      description: income.description
    });
  }

  deleteExpense(id: number): void {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.isLoading = true;
      this.expenseService.deleteExpense(id).subscribe({
        next: () => {
          this.expenses = this.expenses.filter(e => e.id !== id);
          this.calculateTotalExpenses();
          this.calculateRemainingBalance();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error deleting expense:', error);
          this.errorMessage = 'Failed to delete expense. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }

  deleteIncome(id: number): void {
    if (confirm('Are you sure you want to delete this income?')) {
      this.isLoading = true;
      this.incomeService.deleteIncome(id).subscribe({
        next: () => {
          this.incomes = this.incomes.filter(i => i.id !== id);
          this.calculateTotalIncome();
          this.calculateRemainingBalance();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error deleting income:', error);
          this.errorMessage = 'Failed to delete income. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }

  resetExpenseForm(): void {
    this.expenseForm.reset({
      category: '',
      paymentMethod: ''
    });
    this.editingExpense = null;
    this.errorMessage = '';
  }

  resetIncomeForm(): void {
    this.incomeForm.reset({
      source: ''
    });
    this.editingIncome = null;
    this.errorMessage = '';
  }

  calculateTotalExpenses(): void {
    this.totalExpenses = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  calculateTotalIncome(): void {
    this.totalIncome = this.incomes.reduce((sum, income) => sum + income.amount, 0);
  }

  calculateRemainingBalance(): void {
    this.remainingBalance = this.totalIncome - this.totalExpenses;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Form getters for expense form
  get description() { return this.expenseForm.get('description'); }
  get expenseAmount() { return this.expenseForm.get('amount'); }
  get category() { return this.expenseForm.get('category'); }
  get expenseDate() { return this.expenseForm.get('date'); }
  get paymentMethod() { return this.expenseForm.get('paymentMethod'); }

  // Form getters for income form
  get source() { return this.incomeForm.get('source'); }
  get incomeAmount() { return this.incomeForm.get('amount'); }
  get incomeDate() { return this.incomeForm.get('date'); }
  get incomeDescription() { return this.incomeForm.get('description'); }
}
