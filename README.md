# ML SENTIMENT
ML SENTIMENT adalah program yang dibuat untuk menganalisa sebuah text atau pesan masuk kedalam sentimen negatif atau positif. Hasil penilaian berskala dari 0 sampai 1, 0 menunjukan sangat negatif dan 1 sangat positif. Untuk lebih menggambarkan expresi manusia saya mengubahnya skala penilaian menjadi 😡, 😟, 😐, 😉, 😁.

## Teknologi 
- Untuk machine learning menggunakan library [ml5js](https://ml5js.org/) dan menggunakan [pre-trained models](https://learn.ml5js.org/#/reference/sentiment) 
- Karena ml5js hanya berjalan di browser, saya menggunakan [puppeteer](https://github.com/puppeteer/puppeteer) agar nodejs bisa berinteraksi dengan api browser sehingga bisa mengakses ml5js.
- Interaksi dengan ml dapat dilakukan via whatsapp, library yg dipakai [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js/)

## Cara Penggunaan
* ubah .env.example menjadi .env
* npm run start:dev
* scan qr-code menggunakan wa (nomor yg dipakai akan benjadi bot mlnya)
* kirim pesan ke no wa misalnya `i found money`