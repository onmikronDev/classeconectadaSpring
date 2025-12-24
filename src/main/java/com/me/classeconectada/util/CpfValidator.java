package com.me.classeconectada.util;

public class CpfValidator {
    
    /**
     * Validates CPF format and checksum
     * @param cpf The CPF to validate (with or without formatting)
     * @return true if valid, false otherwise
     */
    public static boolean isValid(String cpf) {
        if (cpf == null || cpf.isEmpty()) {
            return false;
        }
        
        // Remove non-numeric characters
        cpf = cpf.replaceAll("[^0-9]", "");
        
        // Check if CPF has 11 digits
        if (cpf.length() != 11) {
            return false;
        }
        
        // Check if all digits are the same (invalid CPFs)
        if (cpf.matches("(\\d)\\1{10}")) {
            return false;
        }
        
        try {
            // Calculate first verification digit
            int sum = 0;
            for (int i = 0; i < 9; i++) {
                sum += Character.getNumericValue(cpf.charAt(i)) * (10 - i);
            }
            int firstDigit = 11 - (sum % 11);
            if (firstDigit >= 10) {
                firstDigit = 0;
            }
            
            // Calculate second verification digit
            sum = 0;
            for (int i = 0; i < 10; i++) {
                sum += Character.getNumericValue(cpf.charAt(i)) * (11 - i);
            }
            int secondDigit = 11 - (sum % 11);
            if (secondDigit >= 10) {
                secondDigit = 0;
            }
            
            // Verify both digits
            return Character.getNumericValue(cpf.charAt(9)) == firstDigit &&
                   Character.getNumericValue(cpf.charAt(10)) == secondDigit;
        } catch (Exception e) {
            return false;
        }
    }
}
