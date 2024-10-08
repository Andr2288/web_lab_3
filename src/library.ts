export class Library<T> {
    private items: T[] = [];

    // Додати елемент до бібліотеки
    addItem(item: T): void {
        this.items.push(item);
    }

    // Видалити елемент з бібліотеки
    removeItem(item: T): void {
        this.items = this.items.filter(i => i !== item);
    }

    // Отримати всі елементи з бібліотеки
    getItems(): T[] {
        return this.items;
    }

    // Знайти елементи в бібліотеці за умовою
    findItems(predicate: (item: T) => boolean): T[] {
        return this.items.filter(predicate);
    }

    // Знайти перший елемент в бібліотеці за умовою
    findFirstItem(predicate: (item: T) => boolean): T | undefined {
        return this.items.find(predicate);
    }
}