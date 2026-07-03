# 🎂 Feliz Cumpleaños, Vickyy ❤️

Sitio-regalo sorpresa para el **cumpleaños de Vicky**. Se abre escaneando un QR en una
carta/tarjeta. La pieza central es un **video** de Tommy con un mensaje de cumpleaños.

Color principal: **azul marino (navy)**. Sin música de fondo — el único audio es el del video.

## 🔗 Link
- **Web (para el QR):** https://tommyhanono.github.io/vicky-cumple/

## ✨ Qué incluye
- **Intro tipo sobre** con confeti al abrir 💌
- **Hero:** "Feliz Cumpleaños Vickyy ❤️" con cielo estrellado y corazones flotando
- **Video (la estrella):** tap-to-play **con sonido**, controles nativos, `playsinline`.
  Transcodificado de `IMG_1313.MOV` (HEVC/HDR de iPhone) a **MP4 H.264 + AAC** con
  tonemapping HDR→SDR para colores fieles en todos los navegadores. Póster generado de un frame.
- **Galería** con las 8 fotos favoritas (lightbox + fechas)
- **Dedicatoria** manuscrita firmada

## 🛠️ Detalles técnicos
- Sitio estático (HTML + CSS + JS, sin build). Se sirve tal cual.
- `media/video.mp4` — 1080p, ~76 MB, `+faststart`.
- Fuentes: Playfair Display, Dancing Script, Nunito (Google Fonts).

## ✏️ Personalizar el mensaje
El texto de la carta está en `index.html`, sección `.letter-section`. Editá ahí libremente.

## ▶️ Correr local
```bash
python3 -m http.server 4610 --directory .
# abrir http://localhost:4610
```
