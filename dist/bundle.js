/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models */ \"./src/models.ts\");\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ \"./src/services.ts\");\n/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation */ \"./src/validation.ts\");\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modal */ \"./src/modal.ts\");\n\n\n\n\nvar App = (function () {\n    function App() {\n        this.borrowBookModal = new _modal__WEBPACK_IMPORTED_MODULE_3__.Modal(\"myModal\");\n        this.borrowInfoBookModal = new _modal__WEBPACK_IMPORTED_MODULE_3__.Modal(\"borrowInfoModal\");\n        this.libraryService = new _services__WEBPACK_IMPORTED_MODULE_1__.LibraryService();\n        this.initialize();\n    }\n    App.prototype.initialize = function () {\n        var _this = this;\n        var bookForm = document.getElementById('bookForm');\n        var userForm = document.getElementById('userForm');\n        var searchButton = document.getElementById('searchButton');\n        bookForm.addEventListener('submit', function (e) { return _this.handleAddBook(e); });\n        userForm.addEventListener('submit', function (e) { return _this.handleAddUser(e); });\n        searchButton.addEventListener('click', function () { return _this.handleSearch(); });\n        this.loadBooks();\n        this.loadUsers();\n    };\n    App.prototype.handleSearch = function () {\n        var query = document.getElementById('searchInput').value;\n        this.searchBooks(query);\n    };\n    App.prototype.searchBooks = function (query) {\n        var books = JSON.parse(localStorage.getItem('books') || '[]');\n        var filteredBooks = books.filter(function (book) {\n            return book.title.toLowerCase().includes(query.toLowerCase()) ||\n                book.author.toLowerCase().includes(query.toLowerCase());\n        });\n        this.displayBooks(filteredBooks);\n    };\n    App.prototype.displayBooks = function (books) {\n        var booksContainer = document.getElementById('card_body_for_books');\n        if (!booksContainer) {\n            console.error('Container for books not found!');\n            return;\n        }\n        booksContainer.innerHTML = '';\n        books.forEach(function (book, index) {\n            var bookDiv = document.createElement('div');\n            bookDiv.classList.add('book', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-2', 'border-bottom', 'pb-2');\n            var bookContent = \"\\n            <span>\".concat(book.title, \" by \").concat(book.author, \" (\").concat(book.year, \")</span>\\n            <div>\\n                <button class=\\\"btn btn-primary borrow-book\\\" data-index=\\\"\").concat(index, \"\\\">\\u041F\\u043E\\u0437\\u0438\\u0447\\u0438\\u0442\\u0438</button>\\n                <button class=\\\"btn btn-danger delete-book\\\" data-index=\\\"\").concat(index, \"\\\">\\u0412\\u0438\\u0434\\u0430\\u043B\\u0438\\u0442\\u0438</button>\\n            </div>\\n        \");\n            bookDiv.innerHTML = bookContent;\n            booksContainer.appendChild(bookDiv);\n        });\n        this.addBookEventListeners();\n    };\n    App.prototype.loadBooks = function () {\n        var books = JSON.parse(localStorage.getItem('books') || '[]');\n        var booksContainer = document.getElementById('booksContainer');\n        if (!booksContainer) {\n            console.error('Container for books not found!');\n            return;\n        }\n        var cardBody = booksContainer.querySelector('#card_body_for_books');\n        if (!cardBody) {\n            console.error('Card body for books not found!');\n            return;\n        }\n        cardBody.innerHTML = '';\n        books.forEach(function (book, index) {\n            var bookDiv = document.createElement('div');\n            bookDiv.classList.add('book', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-2', 'border-bottom', 'pb-2');\n            var bookContent = \"\\n            <span>\".concat(book.title, \" by \").concat(book.author, \" (\").concat(book.year, \")</span>\\n            <div>\\n                <button class=\\\"btn btn-primary borrow-book\\\" data-index=\\\"\").concat(index, \"\\\">\\u041F\\u043E\\u0437\\u0438\\u0447\\u0438\\u0442\\u0438</button>\\n                <button class=\\\"btn btn-danger delete-book\\\" data-index=\\\"\").concat(index, \"\\\">\\u0412\\u0438\\u0434\\u0430\\u043B\\u0438\\u0442\\u0438</button>\\n            </div>\\n        \");\n            bookDiv.innerHTML = bookContent;\n            cardBody.appendChild(bookDiv);\n        });\n        this.addBookEventListeners();\n    };\n    App.prototype.addBookEventListeners = function () {\n        var _this = this;\n        var borrowButtons = document.querySelectorAll('.borrow-book');\n        var deleteButtons = document.querySelectorAll('.delete-book');\n        var borrowButton = document.getElementById(\"borrowButton\");\n        var closeModalButton = document.getElementById(\"closeModalButton\");\n        var closeModalInfoButton = document.getElementById(\"borrowInfoModalCloseButton\");\n        borrowButtons.forEach(function (button) {\n            button.addEventListener('click', function (event) {\n                var index = parseInt(event.target.getAttribute('data-index'), 10);\n                _this.borrowBookModal.setIndex(index);\n                _this.borrowBookModal.open();\n            });\n        });\n        deleteButtons.forEach(function (button) {\n            button.addEventListener('click', function (event) {\n                var index = parseInt(event.target.getAttribute('data-index'), 10);\n                _this.deleteBook(index);\n            });\n        });\n        borrowButton.onclick = function () {\n            var userId = document.getElementById(\"userId\").value;\n            _this.borrowBook(_this.borrowBookModal.getIndex(), userId);\n            _this.borrowBookModal.close();\n        };\n        closeModalButton.onclick = function () {\n            _this.borrowBookModal.close();\n        };\n        closeModalInfoButton.onclick = function () {\n            _this.borrowInfoBookModal.close();\n        };\n    };\n    App.prototype.deleteBook = function (index) {\n        var books = JSON.parse(localStorage.getItem('books') || '[]');\n        if (index >= 0 && index < books.length) {\n            books.splice(index, 1);\n            this.saveBooksToLocalStorage(books);\n            this.loadBooks();\n        }\n        else {\n            console.error(\"Invalid index: \", index);\n        }\n    };\n    App.prototype.borrowBook = function (index, userId) {\n        var books = JSON.parse(localStorage.getItem('books') || '[]');\n        if (index >= 0 && index < books.length) {\n            books[index].isBorrowed = true;\n            this.saveBooksToLocalStorage(books);\n            this.loadBooks();\n            var borrowModalInfoMainText = document.getElementById(\"borrowModalInfoMainText\");\n            borrowModalInfoMainText.innerText = \"\\u041A\\u043D\\u0438\\u0433\\u0443 \\u043F\\u043E\\u0437\\u0438\\u0447\\u0435\\u043D\\u043E \\u043A\\u043E\\u0440\\u0438\\u0441\\u0442\\u0443\\u0432\\u0430\\u0447\\u0435\\u043C: \".concat(userId);\n            this.borrowInfoBookModal.open();\n        }\n        else {\n            console.error(\"Invalid index: \", index);\n        }\n    };\n    App.prototype.loadUsers = function () {\n        var usersData = JSON.parse(localStorage.getItem('users') || '[]');\n        _models__WEBPACK_IMPORTED_MODULE_0__.User.idCounter = usersData.length;\n        var usersContainer = document.getElementById('card_body_for_users');\n        if (!usersContainer) {\n            console.error('Container for users not found!');\n            return;\n        }\n        usersContainer.innerHTML = '';\n        usersData.forEach(function (userData, index) {\n            var user = new _models__WEBPACK_IMPORTED_MODULE_0__.User(userData.name, userData.email, userData.id);\n            var userDiv = document.createElement('div');\n            userDiv.classList.add('user', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-2', 'border-bottom', 'pb-2');\n            var userContent = \"\\n            <span>\".concat(user.getId(), \" \").concat(user.getName(), \" (\").concat(user.getEmail(), \")</span>\\n            <button class=\\\"btn btn-danger delete-user\\\" data-index=\\\"\").concat(index, \"\\\">\\u0412\\u0438\\u0434\\u0430\\u043B\\u0438\\u0442\\u0438</button>\\n        \");\n            userDiv.innerHTML = userContent;\n            usersContainer.appendChild(userDiv);\n        });\n        this.addUserEventListeners();\n    };\n    App.prototype.addUserEventListeners = function () {\n        var _this = this;\n        var deleteUserButtons = document.querySelectorAll('.delete-user');\n        deleteUserButtons.forEach(function (button) {\n            button.addEventListener('click', function (event) {\n                var index = parseInt(event.target.getAttribute('data-index'), 10);\n                _this.deleteUser(index);\n            });\n        });\n    };\n    App.prototype.deleteUser = function (index) {\n        var users = JSON.parse(localStorage.getItem('users') || '[]');\n        if (index >= 0 && index < users.length) {\n            users.splice(index, 1);\n            this.saveUsersToLocalStorage(users);\n            this.loadUsers();\n        }\n        else {\n            console.error(\"Invalid index: \", index);\n        }\n    };\n    App.prototype.handleAddBook = function (event) {\n        event.preventDefault();\n        var title = document.getElementById('bookName').value;\n        var author = document.getElementById('author').value;\n        var year = parseInt(document.getElementById('year').value, 10);\n        var book = new _models__WEBPACK_IMPORTED_MODULE_0__.Book(title, author, year);\n        if (_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.validateBook(book)) {\n            if (_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.validateYear(year)) {\n                this.libraryService.addBook(book);\n                var books = JSON.parse(localStorage.getItem('books') || '[]');\n                books.push(book);\n                this.saveBooksToLocalStorage(books);\n                alert(\"Книгу успішно додано\");\n                this.loadBooks();\n            }\n            else {\n                alert(\"Рік введено неправильно\");\n            }\n        }\n        else {\n        }\n    };\n    App.prototype.saveBooksToLocalStorage = function (books) {\n        localStorage.setItem('books', JSON.stringify(books));\n    };\n    App.prototype.handleAddUser = function (event) {\n        event.preventDefault();\n        var name = document.getElementById('userName').value;\n        var email = document.getElementById('email').value;\n        var user = new _models__WEBPACK_IMPORTED_MODULE_0__.User(name, email);\n        if (_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.isNameValid(user.getName())) {\n            if (_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.isEmailValid(user.getEmail())) {\n                this.libraryService.addUser(user);\n                this.saveUserToLocalStorage(user);\n                alert(\"Користувача успішно створено\");\n                this.loadUsers();\n            }\n            else {\n                alert(\"Email не введено, або введено не коректно\");\n            }\n        }\n    };\n    App.prototype.saveUserToLocalStorage = function (user) {\n        var users = JSON.parse(localStorage.getItem('users') || '[]');\n        users.push(user);\n        localStorage.setItem('users', JSON.stringify(users));\n    };\n    App.prototype.saveUsersToLocalStorage = function (users) {\n        localStorage.setItem('users', JSON.stringify(users));\n    };\n    return App;\n}());\ndocument.addEventListener('DOMContentLoaded', function () {\n    new App();\n});\n\n\n//# sourceURL=webpack://lab-app/./src/app.ts?");

/***/ }),

/***/ "./src/library.ts":
/*!************************!*\
  !*** ./src/library.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Library: () => (/* binding */ Library)\n/* harmony export */ });\nvar Library = (function () {\n    function Library() {\n        this.items = [];\n    }\n    Library.prototype.addItem = function (item) {\n        this.items.push(item);\n    };\n    Library.prototype.removeItem = function (item) {\n        this.items = this.items.filter(function (i) { return i !== item; });\n    };\n    Library.prototype.getItems = function () {\n        return this.items;\n    };\n    Library.prototype.findItems = function (predicate) {\n        return this.items.filter(predicate);\n    };\n    Library.prototype.findFirstItem = function (predicate) {\n        return this.items.find(predicate);\n    };\n    return Library;\n}());\n\n\n\n//# sourceURL=webpack://lab-app/./src/library.ts?");

/***/ }),

/***/ "./src/modal.ts":
/*!**********************!*\
  !*** ./src/modal.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Modal: () => (/* binding */ Modal)\n/* harmony export */ });\nvar Modal = (function () {\n    function Modal(modalId) {\n        this.bookIndex = null;\n        var element = document.getElementById(modalId);\n        if (element === null) {\n            throw new Error(\"\\u0415\\u043B\\u0435\\u043C\\u0435\\u043D\\u0442 \\u0437 ID \\\"\".concat(modalId, \"\\\" \\u043D\\u0435 \\u0437\\u043D\\u0430\\u0439\\u0434\\u0435\\u043D\\u0438\\u0439\"));\n        }\n        this.modalElement = element;\n    }\n    Modal.prototype.setIndex = function (index) {\n        this.bookIndex = index;\n    };\n    Modal.prototype.getIndex = function () {\n        return this.bookIndex !== null ? this.bookIndex : -1;\n    };\n    Modal.prototype.open = function () {\n        this.modalElement.classList.add('show');\n        this.modalElement.style.display = 'block';\n        this.modalElement.setAttribute('aria-hidden', 'false');\n    };\n    Modal.prototype.close = function () {\n        this.modalElement.classList.remove('show');\n        this.modalElement.style.display = 'none';\n        this.modalElement.setAttribute('aria-hidden', 'true');\n    };\n    return Modal;\n}());\n\n\n\n//# sourceURL=webpack://lab-app/./src/modal.ts?");

/***/ }),

/***/ "./src/models.ts":
/*!***********************!*\
  !*** ./src/models.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Book: () => (/* binding */ Book),\n/* harmony export */   User: () => (/* binding */ User)\n/* harmony export */ });\nvar Book = (function () {\n    function Book(title, author, year, isBorrowed) {\n        if (isBorrowed === void 0) { isBorrowed = false; }\n        this.title = title;\n        this.author = author;\n        this.year = year;\n        this.isBorrowed = isBorrowed;\n    }\n    Book.prototype.getTitle = function () {\n        return this.title;\n    };\n    Book.prototype.getAuthor = function () {\n        return this.author;\n    };\n    Book.prototype.getYear = function () {\n        return this.year;\n    };\n    Book.prototype.getIsBorrowed = function () {\n        return this.isBorrowed;\n    };\n    Book.prototype.getBookInfo = function () {\n        return \"Title: \".concat(this.title, \", Author: \").concat(this.author, \", Year: \").concat(this.year, \", Borrowed: \").concat(this.isBorrowed);\n    };\n    return Book;\n}());\n\nvar User = (function () {\n    function User(name, email, id) {\n        this.name = name;\n        this.email = email;\n        this.borrowedBooksCount = 0;\n        this.id = id !== undefined ? id : this.generateId();\n    }\n    User.prototype.generateId = function () {\n        User.idCounter++;\n        return User.idCounter;\n    };\n    User.prototype.borrowBook = function () {\n        if (this.borrowedBooksCount < 3) {\n            this.borrowedBooksCount++;\n            return true;\n        }\n        return false;\n    };\n    User.prototype.returnBook = function () {\n        if (this.borrowedBooksCount > 0) {\n            this.borrowedBooksCount--;\n        }\n    };\n    User.prototype.getBorrowedBooksCount = function () {\n        return this.borrowedBooksCount;\n    };\n    User.prototype.getName = function () {\n        return this.name;\n    };\n    User.prototype.getEmail = function () {\n        return this.email;\n    };\n    User.prototype.getId = function () {\n        return this.id;\n    };\n    User.prototype.getUserInfo = function () {\n        return \"ID: \".concat(this.id, \", Name: \").concat(this.name, \", Email: \").concat(this.email);\n    };\n    User.idCounter = 0;\n    return User;\n}());\n\n\n\n//# sourceURL=webpack://lab-app/./src/models.ts?");

/***/ }),

/***/ "./src/services.ts":
/*!*************************!*\
  !*** ./src/services.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LibraryService: () => (/* binding */ LibraryService)\n/* harmony export */ });\n/* harmony import */ var _library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./library */ \"./src/library.ts\");\n\nvar LibraryService = (function () {\n    function LibraryService() {\n        this.bookLibrary = new _library__WEBPACK_IMPORTED_MODULE_0__.Library();\n        this.userLibrary = new _library__WEBPACK_IMPORTED_MODULE_0__.Library();\n    }\n    LibraryService.prototype.addBook = function (book) {\n        this.bookLibrary.addItem(book);\n    };\n    LibraryService.prototype.addUser = function (user) {\n        this.userLibrary.addItem(user);\n    };\n    LibraryService.prototype.getBooks = function () {\n        return this.bookLibrary.getItems();\n    };\n    LibraryService.prototype.getUsers = function () {\n        return this.userLibrary.getItems();\n    };\n    LibraryService.prototype.borrowBook = function (title) {\n        var book = this.bookLibrary.getItems().find(function (b) { return b.title === title; });\n        if (book) {\n            if (!book.isBorrowed) {\n                book.isBorrowed = true;\n                return \"Book \\\"\".concat(title, \"\\\" has been borrowed.\");\n            }\n            else {\n                return \"Book \\\"\".concat(title, \"\\\" is already borrowed.\");\n            }\n        }\n        return \"Book \\\"\".concat(title, \"\\\" not found.\");\n    };\n    LibraryService.prototype.returnBook = function (title) {\n        var book = this.bookLibrary.getItems().find(function (b) { return b.title === title; });\n        if (book) {\n            if (book.isBorrowed) {\n                book.isBorrowed = false;\n                return \"Book \\\"\".concat(title, \"\\\" has been returned.\");\n            }\n            else {\n                return \"Book \\\"\".concat(title, \"\\\" was not borrowed.\");\n            }\n        }\n        return \"Book \\\"\".concat(title, \"\\\" not found.\");\n    };\n    return LibraryService;\n}());\n\n\n\n//# sourceURL=webpack://lab-app/./src/services.ts?");

/***/ }),

/***/ "./src/validation.ts":
/*!***************************!*\
  !*** ./src/validation.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Validation: () => (/* binding */ Validation)\n/* harmony export */ });\nvar Validation = (function () {\n    function Validation() {\n    }\n    Validation.validateBook = function (book) {\n        if (!book.title || !book.author || !book.year) {\n            return false;\n        }\n        return true;\n    };\n    Validation.validateYear = function (year) {\n        var yearRegex = /^(19|20)\\d{2}$/;\n        return yearRegex.test(String(year));\n    };\n    Validation.validateUser = function (user) {\n        if (!this.isNameValid(user.name)) {\n            return false;\n        }\n        if (!this.isEmailValid(user.email)) {\n            return false;\n        }\n        return true;\n    };\n    Validation.isNameValid = function (name) {\n        return !!name;\n    };\n    Validation.isEmailValid = function (email) {\n        var emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n        return emailRegex.test(email);\n    };\n    return Validation;\n}());\n\n\n\n//# sourceURL=webpack://lab-app/./src/validation.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;