# Konfiguracja Cloudinary

## Krok 1: Utwórz konto Cloudinary
1. Przejdź na [cloudinary.com](https://cloudinary.com)
2. Zarejestruj się za darmo
3. Po zalogowaniu przejdź do Dashboard

## Krok 2: Pobierz dane konfiguracyjne
W Dashboard znajdziesz:
- **Cloud Name** - nazwa Twojego chmury
- **API Key** - klucz API
- **API Secret** - sekretny klucz API

## Krok 3: Zaktualizuj plik .env
Zastąp wartości w pliku `.env`:

```env
DATABASE_URL="postgresql://bigmic@localhost:5432/carmazon?schema=public"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=twoja_nazwa_chmury
CLOUDINARY_API_KEY=twoj_klucz_api
CLOUDINARY_API_SECRET=twoj_sekretny_klucz
```

## Krok 4: Testuj upload
1. Uruchom aplikację: `npm run dev`
2. Przejdź do panelu admina: `http://localhost:3000/admin`
3. Przejdź do zakładki "Samochody"
4. Kliknij "Dodaj samochód"
5. Spróbuj dodać zdjęcie

## Funkcjonalności
- ✅ Upload wielu zdjęć jednocześnie
- ✅ Automatyczne kompresowanie i optymalizacja
- ✅ Podgląd zdjęć przed zapisaniem
- ✅ Możliwość usuwania zdjęć
- ✅ Progress bar podczas uploadu
- ✅ Automatyczne tworzenie folderów w Cloudinary

## Bezpieczeństwo
- Zdjęcia są automatycznie optymalizowane
- Maksymalna szerokość: 800px
- Maksymalna wysokość: 600px
- Jakość: auto (optymalna)
- Folder: `carmazon/cars/`

