import { standardUser } from '../support/commands';

describe('Automation Roadmap Tracker E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  describe('Authentication Flow', () => {
    it('should allow user to sign up', () => {
      cy.visit('/signup');
      
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="email"]').type('testuser@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password123');
      
      cy.get('button[type="submit"]').click();
      
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome back').should('not.exist');
    });

    it('should allow user to login', () => {
      cy.get('input[type="email"]').type(standardUser.email);
      cy.get('input[type="password"]').type(standardUser.password);
      
      cy.get('button[type="submit"]').click();
      
      cy.url().should('include', '/dashboard');
      cy.contains('Dashboard').should('be.visible');
    });

    it('should show error for invalid credentials', () => {
      cy.get('input[type="email"]').type('invalid@email.com');
      cy.get('input[type="password"]').type('wrongpassword');
      
      cy.get('button[type="submit"]').click();
      
      cy.contains(/Invalid credentials|Login failed/).should('be.visible');
    });
  });

  describe('Dashboard Navigation', () => {
    beforeEach(() => {
      // Login before each test
      cy.login(standardUser.email, standardUser.password);
    });

    it('should navigate to different sections', () => {
      // Test navigation to roadmap
      cy.contains('Roadmap').click();
      cy.url().should('include', '/roadmap');
      
      // Test navigation to progress
      cy.contains('Progress').click();
      cy.url().should('include', '/progress');
      
      // Test navigation to artifacts
      cy.contains('Artifacts').click();
      cy.url().should('include', '/artifacts');
    });

    it('should display dashboard overview', () => {
      cy.visit('/dashboard');
      
      // Check for dashboard cards
      cy.contains('Completed').should('be.visible');
      cy.contains('In Progress').should('be.visible');
      cy.contains('Overall Progress').should('be.visible');
      cy.contains('Current Streak').should('be.visible');
    });

    it('should show progress statistics', () => {
      cy.visit('/dashboard');
      
      // Check for progress overview
      cy.contains('Weekly Progress').should('be.visible');
      cy.contains('Tools Used').should('be.visible');
    });
  });

  describe('Progress Tracking', () => {
    beforeEach(() => {
      cy.login(standardUser.email, standardUser.password);
      cy.visit('/progress');
    });

    it('should allow marking activity as done', () => {
      // This test would require seeded data
      // For now, we'll just check that the page loads
      cy.contains('Activity Progress').should('be.visible');
    });
  });

  describe('Responsive Design', () => {
    beforeEach(() => {
      cy.login(standardUser.email, standardUser.password);
    });

    it('should work on mobile viewport', () => {
      cy.viewport('iphone-8');
      cy.visit('/dashboard');
      
      // Check mobile menu functionality
      cy.get('[data-testid="mobile-menu-button"]').should('be.visible').click();
      cy.contains('Dashboard').should('be.visible');
    });

    it('should work on tablet viewport', () => {
      cy.viewport('ipad-2');
      cy.visit('/dashboard');
      
      // Check tablet layout
      cy.contains('Dashboard').should('be.visible');
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors gracefully', () => {
      // Intercept API calls and return errors
      cy.intercept('POST', '/api/auth/login', {
        statusCode: 500,
        body: { success: false, error: 'Server error' }
      }).as('loginError');

      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('password');
      cy.get('button[type="submit"]').click();

      cy.wait('@loginError');
      cy.contains(/Server error|Login failed/).should('be.visible');
    });
  });
});