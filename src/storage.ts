export class Storage {
    // Зберігає дані в localStorage
    saveData<T>(key: string, data: T[]): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Завантажує дані з localStorage
    loadData<T>(key: string): T[] {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    // Очищає конкретний ключ в localStorage
    clearData(key: string): void {
        localStorage.removeItem(key);
    }

    // Очищає весь localStorage
    clearAllData(): void {
        localStorage.clear();
    }

    // Перевіряє, чи існує ключ у localStorage
    keyExists(key: string): boolean {
        return localStorage.getItem(key) !== null;
    }
}