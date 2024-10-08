export class Validation {
    static validateBook(book: { title: string; author: string; year: number }): boolean {
        // Check that all fields are filled
        if (!book.title || !book.author || !book.year) {
            return false;
        }

        return true;
    }

    // New method to validate the year
    static validateYear(year: number): boolean {
        // Check that the year is a number and is between 1900 and 2099
        const yearRegex = /^(19|20)\d{2}$/; // Year should be between 1900 and 2099
        return yearRegex.test(String(year));
    }

    static validateUser(user: { name: string; email: string }): boolean {
        // Перевірка імені
        if (!this.isNameValid(user.name)) {
            return false;
        }

        // Перевірка валідності email
        if (!this.isEmailValid(user.email)) {
            return false;
        }

        return true;
    }

    static isNameValid(name: string): boolean {
        return !!name;  // Перевіряє, чи не порожнє ім'я
    }

    static isEmailValid(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);  // Перевіряє валідність email
    }
}
