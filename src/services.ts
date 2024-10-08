    import { Book, User, IBook, IUser } from './models';
    import { Library } from './library';

    export class LibraryService {
        private bookLibrary: Library<Book>;
        private userLibrary: Library<User>;

        constructor() {
            this.bookLibrary = new Library<Book>();
            this.userLibrary = new Library<User>();
        }

        // Add a book
        addBook(book: Book): void {
            this.bookLibrary.addItem(book);
        }

        // Add a user
        addUser(user: User): void {
            this.userLibrary.addItem(user);
        }

        // Get all books
        getBooks(): Book[] {
            return this.bookLibrary.getItems();
        }

        // Get all users
        getUsers(): User[] {
            return this.userLibrary.getItems();
        }

        // Borrow a book
        borrowBook(title: string): string {
            const book = this.bookLibrary.getItems().find(b => b.title === title);
            if (book) {
                if (!book.isBorrowed) {
                    book.isBorrowed = true;
                    return `Book "${title}" has been borrowed.`;
                } else {
                    return `Book "${title}" is already borrowed.`;
                }
            }
            return `Book "${title}" not found.`;
        }

        // Return a book
        returnBook(title: string): string {
            const book = this.bookLibrary.getItems().find(b => b.title === title);
            if (book) {
                if (book.isBorrowed) {
                    book.isBorrowed = false;
                    return `Book "${title}" has been returned.`;
                } else {
                    return `Book "${title}" was not borrowed.`;
                }
            }
            return `Book "${title}" not found.`;
        }
    }
