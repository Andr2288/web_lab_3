export interface IBook {
    title: string;
    author: string;
    year: number;
    isBorrowed: boolean; // Додана нова властивість
}

export class Book implements IBook {
    constructor(
        public title: string,
        public author: string,
        public year: number,
        public isBorrowed: boolean = false // За замовчуванням книга не позичена
    ) {}

    // Геттер для доступу до властивості title
    getTitle(): string {
        return this.title;
    }

    // Геттер для доступу до властивості author
    getAuthor(): string {
        return this.author;
    }

    // Геттер для доступу до властивості year
    getYear(): number {
        return this.year;
    }

    // Геттер для доступу до статусу позиченої книги
    getIsBorrowed(): boolean {
        return this.isBorrowed;
    }

    // Додатково можна додати метод для представлення книги
    getBookInfo(): string {
        return `Title: ${this.title}, Author: ${this.author}, Year: ${this.year}, Borrowed: ${this.isBorrowed}`;
    }
}

export interface IUser {
    name: string;
    email: string;
}

export class User implements IUser {
    public static idCounter = 0; // Counter for generating id
    public id: number; // Change id type to number
    public borrowedBooksCount: number = 0; // Count of borrowed books

    constructor(
        public name: string,
        public email: string,
        id?: number // id is now passed via parameters
    ) {
        this.id = id !== undefined ? id : this.generateId(); // Use provided id or generate a new one
    }

    // Method to generate id (3 digits)
    private generateId(): number {
        User.idCounter++; // Increment counter
        return User.idCounter; // Generate id
    }

    // Method to borrow a book
    borrowBook(): boolean {
        if (this.borrowedBooksCount < 3) {
            this.borrowedBooksCount++;
            return true; // Borrowing successful
        }
        return false; // User has already borrowed 3 books
    }

    // Method to return a book
    returnBook(): void {
        if (this.borrowedBooksCount > 0) {
            this.borrowedBooksCount--;
        }
    }

    // Getter for borrowed books count
    getBorrowedBooksCount(): number {
        return this.borrowedBooksCount;
    }

    // Getter for name, email, and id
    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getId(): number {
        return this.id;
    }

    getUserInfo(): string {
        return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}`;
    }
}