// shared/lib/storage.ts

/**
 * Сохраняет данные в localStorage
 * @param key - ключ для сохранения
 * @param value - данные для сохранения (будет автоматически преобразовано в JSON)
 */
export const saveToLocalStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error('Error saving to localStorage', error)
  }
}

/**
 * Загружает данные из localStorage
 * @param key - ключ для загрузки
 * @returns Данные или null, если не найдены или произошла ошибка
 */
export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key)
    return serializedValue ? JSON.parse(serializedValue) as T : null
  } catch (error) {
    console.error('Error loading from localStorage', error)
    return null
  }
}

/**
 * Удаляет данные из localStorage
 * @param key - ключ для удаления
 */
export const removeFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key)
}

/**
 * Очищает весь localStorage
 */
export const clearLocalStorage = (): void => {
  localStorage.clear()
}
