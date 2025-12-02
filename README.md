# Mehmet Alp Arslan - Kişisel Portföy Web Sitesi

Modern, sade ve profesyonel kişisel portföy web sitesi. Ekonometri öğrencisi ve freelance yazılım geliştirici olarak hizmetlerimi ve projelerimi sergileyen responsive bir platform.

## 🌟 Özellikler

### Temel Özellikler
- ✅ **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm (mobil, tablet, desktop)
- ✅ **Dark Mode**: Kullanıcı dostu karanlık mod desteği
- ✅ **Çok Dilli**: Türkçe ve İngilizce dil seçeneği
- ✅ **SEO Uyumlu**: Arama motorları için optimize edilmiş
- ✅ **Hızlı Yükleme**: Optimize edilmiş kod ve kaynaklar
- ✅ **Yumuşak Animasyonlar**: Profesyonel geçiş efektleri

### Sayfa Bölümleri
1. **Ana Sayfa (Hero Section)**
   - Büyük başlık ve kısa tanıtım
   - İletişim butonu
   - Sosyal medya bağlantıları
   - Dinamik arka plan animasyonu

2. **Hakkımda (About)**
   - Eğitim bilgileri
   - Yetenekler ve beceriler
   - Hedefler ve vizyonu

3. **Hizmetler (Services)**
   - Mobil uygulama geliştirme
   - Web sitesi tasarımı ve geliştirme
   - UI/UX tasarım

4. **Projeler (Portfolio)**
   - VEBET - Veri Bilimi ve Ekonometri Topluluğu Web Sitesi
   - Bağoğlu Hafriyat - İş Makinesi Kiralama Web Sitesi
   - Gerçek proje linkleri ve açıklamaları
   - Teknoloji etiketleri

5. **İletişim (Contact)**
   - İletişim formu
   - E-posta ve konum bilgileri
   - Sosyal medya linkleri

## 🎨 Tasarım

### Renk Paleti
- **Primary Color**: `#7c3aed` (Deep Purple)
- **Secondary Color**: `#2563eb` (Royal Blue)
- **Accent Color**: `#0ea5e9` (Sky Blue)
- **Light Mode**: Beyaz, açık gri tonları, minimalist
- **Dark Mode**: Derin siyah ve mor tonları, gizemli ve şık

### Tipografi
- **Font Family**: Poppins (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700
- Modern ve okunaklı tasarım

## 🚀 Kurulum ve Kullanım

### Gereksinimler
- Modern bir web tarayıcı (Chrome, Firefox, Safari, Edge)
- Web sunucusu (opsiyonel, yerel geliştirme için)

### Yerel Olarak Çalıştırma

1. **Dosyaları indirin veya klonlayın**
   ```bash
   git clone https://github.com/mehmetalp/portfolio.git
   cd portfolio
   ```

2. **Web tarayıcısında açın**
   - `index.html` dosyasını doğrudan tarayıcınızda açabilirsiniz
   - Veya yerel bir sunucu kullanın:

   **Python 3 ile:**
   ```bash
   python -m http.server 8000
   ```
   Ardından `http://localhost:8000` adresine gidin.

   **Node.js ile:**
   ```bash
   npx http-server
   ```

   **VS Code Live Server ile:**
   - VS Code'da Live Server eklentisini yükleyin
   - `index.html` dosyasına sağ tıklayıp "Open with Live Server" seçin

## 📁 Dosya Yapısı

```
mehmetalpsite/
│
├── index.html          # Ana HTML dosyası
├── style.css           # CSS stilleri
├── script.js           # JavaScript fonksiyonları
└── README.md           # Bu dosya
```

## 🛠️ Teknolojiler

- **HTML5**: Semantik ve erişilebilir yapı
- **CSS3**: Modern stil özellikleri, Grid, Flexbox, Animasyonlar
- **JavaScript (Vanilla)**: Temiz ve modüler kod yapısı
- **Font Awesome**: İkonlar için
- **Google Fonts**: Poppins font ailesi

## ⚙️ Özelleştirme

### Kişisel Bilgileri Güncelleme

#### 1. İsim ve Başlık
`index.html` dosyasında aşağıdaki bölümleri güncelleyin:
```html
<span class="name">Mehmet Alp Arslan</span>
```

#### 2. E-posta ve İletişim Bilgileri
```html
<a href="mailto:mehmetalp@email.com">mehmetalp@email.com</a>
```

#### 3. Sosyal Medya Linkleri
```html
<a href="https://github.com/mehmetalparslan" ...>
<a href="https://linkedin.com/in/mehmetalparslan" ...>
<a href="https://instagram.com/mehmetalparslan" ...>
```

### Renkleri Değiştirme

`style.css` dosyasında CSS değişkenlerini düzenleyin:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #06b6d4;
    /* ... diğer renkler */
}
```

### Projeler Ekleme/Güncelleme

`index.html` içinde Portfolio bölümünde yeni proje kartları ekleyebilirsiniz:
```html
<div class="portfolio-item">
    <div class="portfolio-content">
        <div class="portfolio-header">
            <i class="fas fa-icon-name"></i>
            <h3>Proje Adı</h3>
        </div>
        <p>Proje açıklaması...</p>
        <div class="portfolio-tags">
            <span>Teknoloji 1</span>
            <span>Teknoloji 2</span>
        </div>
        <a href="https://projelinki.com" target="_blank" class="project-link">
            <span>Siteyi Ziyaret Et</span>
            <i class="fas fa-external-link-alt"></i>
        </a>
    </div>
</div>
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px ve üzeri
- **Tablet**: 768px - 1199px
- **Mobil**: 767px ve altı

## 🌐 Tarayıcı Desteği

- Chrome (son 2 versiyon)
- Firefox (son 2 versiyon)
- Safari (son 2 versiyon)
- Edge (son 2 versiyon)

## 📈 Performans İpuçları

1. **Görseller**: Gerçek projelerde görselleri optimize edin (WebP formatı önerilir)
2. **Minification**: Canlıya alırken CSS ve JS dosyalarını minify edin
3. **CDN**: Font Awesome ve Google Fonts için CDN kullanımı
4. **Caching**: Tarayıcı önbellekleme için uygun header'ları ayarlayın

## 🔒 Güvenlik

- Formdan gelen veriler için sunucu tarafında validasyon ekleyin
- HTTPS kullanın (özellikle form gönderimlerinde)
- XSS ve CSRF saldırılarına karşı önlem alın

## 📧 İletişim Formu Entegrasyonu

Şu anda form client-side validasyon yapıyor. Gerçek bir uygulamada aşağıdaki seçenekleri kullanabilirsiniz:

### Seçenek 1: FormSpree
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Seçenek 2: Netlify Forms
```html
<form name="contact" method="POST" data-netlify="true">
```

### Seçenek 3: EmailJS
JavaScript ile doğrudan e-posta gönderimi

### Seçenek 4: Kendi Backend'iniz
Node.js, PHP veya Python ile kendi sunucunuzu kurabilirsiniz

## 🚀 Deployment (Yayınlama)

### GitHub Pages
1. GitHub'da bir repository oluşturun
2. Dosyaları push edin
3. Settings > Pages bölümünden GitHub Pages'i aktifleştirin

### Netlify
1. [Netlify](https://netlify.com)'a giriş yapın
2. "New site from Git" seçeneğini kullanın
3. Otomatik deploy

### Vercel
1. [Vercel](https://vercel.com)'e giriş yapın
2. Projeyi import edin
3. Deploy edin

## 📝 Lisans

Bu proje kişisel kullanım içindir. İstediğiniz gibi özelleştirebilir ve kullanabilirsiniz.

## 🙏 Teşekkürler

- Font Awesome ikonları için
- Google Fonts için
- Tüm açık kaynak topluluğuna

## 📞 İletişim

- **E-posta**: info@mehmetalparslan.com
- **LinkedIn**: [linkedin.com/in/mehmetalparslan](https://linkedin.com/in/mehmetalparslan)
- **GitHub**: [github.com/mehmetalparslan](https://github.com/mehmetalparslan)
- **Instagram**: [instagram.com/mehmetalparslan](https://instagram.com/mehmetalparslan)

---

**Not**: Sosyal medya linklerini ve e-posta adresini kendi bilgilerinizle güncelleyin!

Made with ❤️ by Mehmet Alp Arslan

# web-sitem
