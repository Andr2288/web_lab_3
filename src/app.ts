import { Book, User } from './models';
import { LibraryService } from './services';
import { Validation } from './validation';
import { Modal } from './modal';

class App {
    private libraryService: LibraryService;
    private borrowBookModal: Modal;
    private borrowInfoBookModal: Modal;

    constructor() {
        this.borrowBookModal = new Modal("myModal");
        this.borrowInfoBookModal = new Modal("borrowInfoModal");
        this.libraryService = new LibraryService();
        this.initialize();
    }

    initialize(): void {
        const bookForm = document.getElementById('bookForm') as HTMLFormElement;
        const userForm = document.getElementById('userForm') as HTMLFormElement;
        const searchButton = document.getElementById('searchButton') as HTMLButtonElement;

        bookForm.addEventListener('submit', (e) => this.handleAddBook(e));
        userForm.addEventListener('submit', (e) => this.handleAddUser(e));
        searchButton.addEventListener('click', () => this.handleSearch()); // Add search event listener

        this.loadBooks();
        this.loadUsers();
    }

// Handle Search
    handleSearch(): void {
        const query = (document.getElementById('searchInput') as HTMLInputElement).value;
        this.searchBooks(query);
    }

    searchBooks(query: string): void {
        const books = JSON.parse(localStorage.getItem('books') || '[]') as Book[];
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        );

        this.displayBooks(filteredBooks);
    }

// Method to display books
    private displayBooks(books: Book[]): void {
        const booksContainer = document.getElementById('card_body_for_books');
        if (!booksContainer) {
            console.error('Container for books not found!');
            return;
        }

        booksContainer.innerHTML = ''; // Clear previous content

        books.forEach((book, index) => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-2', 'border-bottom', 'pb-2');

            const bookContent = `
            <span>${book.title} by ${book.author} (${book.year})</span>
            <div>
                <button class="btn btn-primary borrow-book" data-index="${index}">Позичити</button>
                <button class="btn btn-danger delete-book" data-index="${index}">Видалити</button>
            </div>
        `;
            bookDiv.innerHTML = bookContent;
            booksContainer.appendChild(bookDiv);
        });

        this.addBookEventListeners(); // Add event listeners again
    }

    // Load books from localStorage and display them in a styled div
    loadBooks(): void {
        const books = JSON.parse(localStorage.getItem('books') || '[]') as Book[];

        // Get the container where the books will be displayed
        const booksContainer = document.getElementById('booksContainer');
        if (!booksContainer) {
            console.error('Container for books not found!');
            return; // Stop execution if the container is not found
        }

        const cardBody = booksContainer.querySelector('#card_body_for_books');
        if (!cardBody) {
            console.error('Card body for books not found!');
            return; // Stop execution if the card body is not found
        }

        cardBody.innerHTML = ''; // Clear the previous content

        books.forEach((book, index) => {
            // Create a div for each book
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-2', 'border-bottom', 'pb-2');

            // Create the content for the book
            const bookContent = `
            <span>${book.title} by ${book.author} (${book.year})</span>
            <div>
                <button class="btn btn-primary borrow-book" data-index="${index}">Позичити</button>
                <button class="btn btn-danger delete-book" data-index="${index}">Видалити</button>
            </div>
        `;
            bookDiv.innerHTML = bookContent;

            // Append the book div to the container
            cardBody.appendChild(bookDiv);
        });

        // Add event listeners to the "Позичити" and "Видалити" buttons
        this.addBookEventListeners();
    }

// Add event listeners to the "Позичити" and "Видалити" buttons
    addBookEventListeners(): void {
        const borrowButtons = document.querySelectorAll('.borrow-book');
        const deleteButtons = document.querySelectorAll('.delete-book');
        const borrowButton = document.getElementById("borrowButton") as HTMLElement;
        const closeModalButton = document.getElementById("closeModalButton") as HTMLElement;
        const closeModalInfoButton = document.getElementById("borrowInfoModalCloseButton") as HTMLElement;

        // Add event listener for each borrow button
        borrowButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = parseInt((event.target as HTMLElement).getAttribute('data-index')!, 10);
                this.borrowBookModal.setIndex(index); // Зберігаємо індекс книги
                this.borrowBookModal.open(); // Відкриваємо модальне вікно
            });
        });

        // Add event listener for each delete button
        // Додайте цей код у метод addBookEventListeners
        deleteButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = parseInt((event.target as HTMLElement).getAttribute('data-index')!, 10);
                this.deleteBook(index); // Викликаємо метод для видалення книги
            });
        });

        borrowButton.onclick = () => {
            const userId = (document.getElementById("userId") as HTMLInputElement).value;
            this.borrowBook(this.borrowBookModal.getIndex(), userId); // Передаємо індекс книги та ID користувача
            this.borrowBookModal.close();
        };

        closeModalButton.onclick = () => {
            this.borrowBookModal.close();
        };

        closeModalInfoButton.onclick = () => {
            this.borrowInfoBookModal.close();
        };
    }

    // Додайте цей метод у клас App
    deleteBook(index: number): void {
        // Завантажити книги з localStorage
        const books = JSON.parse(localStorage.getItem('books') || '[]') as Book[];

        // Перевірка, чи індекс дійсний
        if (index >= 0 && index < books.length) {
            // Видалити книгу за індексом
            books.splice(index, 1);

            // Оновити localStorage
            this.saveBooksToLocalStorage(books);

            // Оновити список книг на екрані
            this.loadBooks();
        } else {
            console.error("Invalid index: ", index);
        }
    }

    borrowBook(index: number, userId: string): void {
        // Завантажити книги з localStorage
        const books = JSON.parse(localStorage.getItem('books') || '[]') as Book[];

        // Перевірка, чи індекс дійсний
        if (index >= 0 && index < books.length) {
            // Позичити книгу, змінивши статус isBorrowed
            books[index].isBorrowed = true;

            // Оновити localStorage
            this.saveBooksToLocalStorage(books);

            // Оновити список книг на екрані
            this.loadBooks();

            const borrowModalInfoMainText = document.getElementById("borrowModalInfoMainText") as HTMLElement;
            borrowModalInfoMainText.innerText = `Книгу позичено користувачем: ${userId}`;
            this.borrowInfoBookModal.open();
        } else {
            console.error("Invalid index: ", index);
        }
    }

    loadUsers(): void {
        const usersData = JSON.parse(localStorage.getItem('users') || '[]') as any[];
        User.idCounter = usersData.length;

        const usersContainer = document.getElementById('card_body_for_users');
        if (!usersContainer) {
            console.error('Container for users not found!');
            return;
        }

        usersContainer.innerHTML = '';

        usersData.forEach((userData, index) => { // Include index parameter
            const user = new User(userData.name, userData.email, userData.id);

            const userDiv = document.createElement('div');
            userDiv.classList.add('user', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-2', 'border-bottom', 'pb-2');

            const userContent = `
            <span>${user.getId()} ${user.getName()} (${user.getEmail()})</span>
            <button class="btn btn-danger delete-user" data-index="${index}">Видалити</button>
        `;
            userDiv.innerHTML = userContent;

            usersContainer.appendChild(userDiv);
        });

        this.addUserEventListeners(); // Call to add user event listeners
    }

    addUserEventListeners(): void {
        const deleteUserButtons = document.querySelectorAll('.delete-user');

        deleteUserButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = parseInt((event.target as HTMLElement).getAttribute('data-index')!, 10);
                this.deleteUser(index);
            });
        });
    }

    deleteUser(index: number): void {
        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];

        if (index >= 0 && index < users.length) {
            users.splice(index, 1); // Remove the user at the specified index
            this.saveUsersToLocalStorage(users); // Save the updated list to localStorage
            this.loadUsers(); // Refresh the user list
        } else {
            console.error("Invalid index: ", index);
        }
    }

    // Handle adding a book
    handleAddBook(event: Event): void {
        event.preventDefault();
        const title = (document.getElementById('bookName') as HTMLInputElement).value;
        const author = (document.getElementById('author') as HTMLInputElement).value;
        const year = parseInt((document.getElementById('year') as HTMLInputElement).value, 10);

        const book = new Book(title, author, year);

        if (Validation.validateBook(book)) {
            if (Validation.validateYear(year)) {
                this.libraryService.addBook(book);

                // Load current books from localStorage and add the new one
                const books = JSON.parse(localStorage.getItem('books') || '[]') as Book[];
                books.push(book);  // Add the new book to the list
                this.saveBooksToLocalStorage(books);  // Save the updated list to localStorage
                alert("Книгу успішно додано");
                this.loadBooks();
            }
            else {
                alert("Рік введено неправильно");
            }
        } else {
        }
    }

    // Add this method in the App class
    private saveBooksToLocalStorage(books: Book[]): void {
        localStorage.setItem('books', JSON.stringify(books));
    }

    // Handle adding a user
    handleAddUser(event: Event): void {
        event.preventDefault();
        const name = (document.getElementById('userName') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;

        const user = new User(name, email);

        if (Validation.isNameValid(user.getName())) {
            if (Validation.isEmailValid(user.getEmail())) {
                this.libraryService.addUser(user);
                this.saveUserToLocalStorage(user); // Зберегти нового користувача в localStorage
                alert("Користувача успішно створено");
                this.loadUsers();
            } else {
                alert("Email не введено, або введено не коректно"); // Повідомлення про неправильний email
            }
        }
    }

    // Method to save users to localStorage
    private saveUserToLocalStorage(user: User): void {
        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        users.push(user); // Add the new user to the list
        localStorage.setItem('users', JSON.stringify(users)); // Save the updated list to localStorage
    }

    private saveUsersToLocalStorage(users: User[]): void {
        localStorage.setItem('users', JSON.stringify(users)); // Save the updated list to localStorage
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
