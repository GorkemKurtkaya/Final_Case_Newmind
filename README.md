# Final_Case_Newmind


# E-Ticaret Sitesi(Gorkem Markt)

Bu Proje Patika.dev/Newmind AI Fullstack Bootcamp için hazırlamış olduğum e-ticaret projesidir. Proje, backend, frontend ve microservices olmak üzere üç ana bileşenden oluşmaktadır. Her bir bileşen, modern teknolojiler kullanılarak geliştirilmiştir ve Docker ile kolayca çalıştırılabilir durumdadır.

## Dökümantasyon
- https://documenter.getpostman.com/view/33385054/2sAYJ3F2bo

## Proje İçeriği

#### Kullanılan Teknolojiler ve Araçlar

- **Backend:** Node.js, Express, MongoDB, JWT, Cloudinary, Redis, Kafka

- **Frontend:** React, Vite, Ant Design, Axios

- **Microservices:** Node.js, Express, MongoDB, Kafka

- **Diğer Araçlar:** Docker, Docker Compose, Elasticsearch

### Backend

**Teknolojiler:** Node.js, Express, MongoDB, Kafka, Zookeeper, Redis

**Bağımlılıklar:**

- Kullanıcı kimlik doğrulaması için JWT

- Medya yönetimi için Cloudinary

- Elasticsearch ile arama özellikleri

- Redis ve Kafka entegrasyonu

Backend, ürünlerin yönetimi, kullanıcı oturum işlemleri ve siparişlerin işlenmesi gibi temel işlevleri sağlar.

### Mikroservices

**Teknolojiler:** Node.js, Express, MongoDB, Kafka, Zookeeper

**Servisler:**

- **payment:** Ödeme işlemlerini gerçekleştirir.

- **faturaKafka:** Ödeme işlemi sonrası fatura oluşturur.

- **orderKafka:** Sipariş oluşturma ve backend ile entegrasyonu sağlar.

### Frontend


**Teknolojiler:** React (Vite ile kurulum), Ant Design, Axios

- Kullanıcılar, ürünleri görüntüleyebilir, sepetlerine ekleyebilir ve siparişlerini takip edebilir.


## Projeyi Çalıştırma

İsteğinize bağlı olarak isterseniz ```docker compose -up -d``` ile direkt projeyi başlatabilirsiniz. Localde çalıştırmak isterseniz redis ve kafka bağlantılarının olduğu kodlarımın içerisine yorum satırı olarak gerekli kodları bıraktım.

### Gereksinimler

- Node.js (v16 veya üzeri)

- Docker

- Docker Compose

- MongoDB, Kafka ve Redis'in yerel kurulumu (local çalıştırmak isteyenler için gerekli komutlar proje klasörlerinde bulunmaktadır)

### Kurulum Adımları

#### 1. Klonlama
```sh
git clone https://github.com/username/e-commerce.git
cd e-commerce
```

####  2. Çevre Değişkenlerini Ayarlayın
Her bir bileşenin .env dosyalarını kontrol edin ve uygun şekilde düzenleyin. Örnek .env dosyaları:

**Backend (.env):**
```sh
DB_URI=mongodb+srv://root:...
PORT=3000
JWT_SECRET=secret
CLOUD_NAME=dn...
CLOUD_API_KEY=9817...
CLOUD_API_SECRET=-oBrcV...
ELASTIC_CLOUD_ID=793fc1abb8fe49a08f8b1...
ELASTIC_USER=elastic
ELASTIC_PASSWORD=7eeM...
```

Microservices (.env):

- payment:
```sh
DB_URI=mongodb+srv://root:...
PORT=3500
```

- faturaKafka:
```sh
DB_URI=mongodb+srv://root:...
PORT=4500
```

- orderKafka:
```sh
DB_URI=mongodb+srv://root:...
PORT=5500
```

#### 3. Docker Kullanarak Çalıştırın

Tüm bileşenleri Docker ile başlatmak için aşağıdaki komutu kullanabilirsiniz:

```sh
docker-compose up --build
```

Docker Compose dosyası, backend, frontend, microservices, Redis ve Kafka yapılandırmasını içerir.

#### 4. Local Çalıştırma (Opsiyonel)

Eğer Docker yerine local olarak çalıştırmak isterseniz:

##### 1. Her bir bileşenin içinde ``` npm install```  ile bağımlılıkları yükleyin.

##### 2. Redis ve Kafka'nın local kurulumlarını yapın.

##### 3. Her bir bileşeni şu şekilde başlatın:

```sh
npm start
```

## Proje Kullanımı

### Ürünler:

- Notebook, cep telefonu ve tablet kategorilerinde ürünler görüntülenebilir.

- Ürünler sepete eklenebilir.

### Sepet ve Siparişler:

- Sepetteki ürünler satın alınabilir.

- Kullanıcı profili üzerinden sipariş geçmişi detaylı bir şekilde incelenebilir.

## Dikkat Edilmesi Gerekenler

- Kafka ve Zookeeper olmadan mikroservisler çalışmaz. Eğer Kafka ve Zookeeper düzgün çalışmıyorsa gerekli logları kontrol edin.

- .env dosyalarını doğru şekilde doldurduğunuzdan emin olun.

- Docker Compose kullanımı sırasında Redis ve Kafka'nın stabilize olması birkaç dakika alabilir. Sabırlı olun.


  
## Belgelendirme

[Belgelendirme](https://linktodocumentation)

  
    

  
## Ekran Görüntüleri

### Ana Sayfa
| ![image](https://github.com/user-attachments/assets/1441353c-e795-4cd5-9f91-986bd09bd1f6) | ![image](https://github.com/user-attachments/assets/547cb637-32f9-4ce4-836f-ed6295bb7fdd) |
|:---:|:---:|

### Ürün Gösterimi
| ![image](https://github.com/user-attachments/assets/d866f898-fd92-49df-bc89-e9f0bb9301b9) | ![image](https://github.com/user-attachments/assets/48a1c4f8-c0d2-4493-b4eb-242ac79076e7) |
|:---:|:---:|

### Sepet
![image](https://github.com/user-attachments/assets/948c02b2-4dce-4391-8cca-7a090abe8f1f)

### Ödeme İşlemi

![image](https://github.com/user-attachments/assets/62eb3dc1-d4d1-4125-8937-38da79e58493)


### Profil
![image](https://github.com/user-attachments/assets/877179a6-f2de-4db1-8a6a-627382ee596e)

### Notebooks
| ![image](https://github.com/user-attachments/assets/9bd1fcf0-ce90-4e27-aa81-bf5002ee5386) | ![image](https://github.com/user-attachments/assets/360f3541-4eb3-46b7-8859-172f852d9f99) |
|:---:|:---:|

### Cep Telefonu
| ![image](https://github.com/user-attachments/assets/ed86da37-4434-4085-b6fd-a5970b3747bd) | ![image](https://github.com/user-attachments/assets/4fb6e864-4ad2-4e0f-b142-00ac2c466bcd) |
|:---:|:---:|

### Tablet
| ![image](https://github.com/user-attachments/assets/97edf66e-159b-4791-a51b-5e73fcfd71d7) | ![image](https://github.com/user-attachments/assets/0ea68dd2-746a-477d-9ba6-3a1ee6495b6f) |
|:---:|:---:|













  
