export class Modal {
    private modalElement: HTMLElement;
    private bookIndex: number | null = null; // Додаємо поле для зберігання індексу книги

    constructor(modalId: string) {
        const element = document.getElementById(modalId);
        if (element === null) {
            throw new Error(`Елемент з ID "${modalId}" не знайдений`);
        }
        this.modalElement = element;
    }

    setIndex(index: number): void {
        this.bookIndex = index; // Зберігаємо індекс книги
    }

    getIndex(): number {
        return this.bookIndex !== null ? this.bookIndex : -1; // Return -1 if no index is set
    }


    open(): void {
        // Додаємо клас "show" і змінюємо стилі, щоб показати модальне вікно
        this.modalElement.classList.add('show');
        this.modalElement.style.display = 'block';
        this.modalElement.setAttribute('aria-hidden', 'false');
    }

    close(): void {
        // Прибираємо клас "show" і ховаємо модальне вікно
        this.modalElement.classList.remove('show');
        this.modalElement.style.display = 'none';
        this.modalElement.setAttribute('aria-hidden', 'true');
    }
}