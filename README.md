# Next.js Rendering Demo (SSG / SSR / CSR)

Aplikasi web sederhana untuk tugas kuliah: mendemokan 3 teknik rendering modern di Next.js (App Router), integrasi API publik, dan state management.

## Tech Stack

- Next.js (App Router)
- React
- TypeScript

## Sumber Data (API Publik)

Menggunakan DummyJSON Products API:

- https://dummyjson.com/products

Data ditampilkan dinamis dalam UI (grid produk, pencarian, favorites).

## Teknik Rendering (Wajib)

Tiga teknik rendering yang diimplementasikan:

1) **SSG**: [app/ssg/page.tsx](app/ssg/page.tsx)
	- Menggunakan server component + caching.
	- `export const revalidate = 3600` (ISR) agar halaman statis namun bisa diperbarui periodik.

2) **SSR**: [app/ssr/page.tsx](app/ssr/page.tsx)
	- `export const dynamic = "force-dynamic"` + `fetch(..., { cache: "no-store" })`
	- Data diambil per request.

3) **CSR**: [app/csr/page.tsx](app/csr/page.tsx)
	- Client component dengan `useEffect()` untuk fetch data di browser.
	- Ada loading indicator dan error handling.

## State Management (Wajib)

1) **Local state (useState)**
	- Input pencarian di halaman CSR.

2) **Context API (nilai tambah)**
	- Favorites global: [app/state/favorites.tsx](app/state/favorites.tsx)
	- Provider dipasang di root: [app/providers.tsx](app/providers.tsx) dan [app/layout.tsx](app/layout.tsx)
	- Tersimpan di `localStorage` (persist antar refresh).

## Halaman

- `/` : menu utama demo
- `/ssg` : demo SSG
- `/ssr` : demo SSR
- `/csr` : demo CSR + favorites + search

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Catatan

- Jika API DummyJSON sedang tidak bisa diakses, halaman CSR akan menampilkan error state.
