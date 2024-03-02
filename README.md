query sql : 
CREATE DATABASE assignment

CREATE OR REPLACE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  PASSWORD VARCHAR(255) NOT NULL,
  profile_image VARCHAR(255),
  balance DECIMAL(16) DEFAULT 0.00
);
CREATE OR REPLACE TABLE banner(
  id INT AUTO_INCREMENT PRIMARY KEY,
  banner_name VARCHAR(255) NOT NULL,
  banner_image VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL
)

CREATE OR REPLACE TABLE service(
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_code VARCHAR(255) NOT NULL UNIQUE,
  service_name VARCHAR(255) NOT NULL,
  service_icon VARCHAR(255) NOT NULL,
  service_tariff VARCHAR(255) NOT NULL
)

CREATE OR REPLACE TABLE TRANSACTION(
  id INT AUTO_INCREMENT PRIMARY KEY,
  transaction_type VARCHAR(255) NOT NULL,
  amount DECIMAL(16) NOT NULL,
  description VARCHAR(255) NOT NULL,
  create_at DATETIME
) 
CREATE OR REPLACE TABLE history(
  id INT AUTO_INCREMENT PRIMARY KEY,
  invoice_number VARCHAR(255) NOT NULL,
  transaction_type VARCHAR(255) NOT NULL,
  amount DECIMAL(16) NOT NULL,
  description VARCHAR(255) NOT NULL,
  create_on DATETIME
) 

INSERT INTO banner (id,banner_name,banner_image,description) VALUES 
('','banner 1','https://nutech-integrasi.app/dummy.jpg','Lorem lipsum dolor sit amet'),
('','banner 2','https://nutech-integrasi.app/dummy.jpg','Lorem lipsum dolor sit amet'),
('','banner 3','https://nutech-integrasi.app/dummy.jpg','Lorem lipsum dolor sit amet'),
('','banner 4','https://nutech-integrasi.app/dummy.jpg','Lorem lipsum dolor sit amet'),
('','banner 5','https://nutech-integrasi.app/dummy.jpg','Lorem lipsum dolor sit amet'),
('','banner 6','https://nutech-integrasi.app/dummy.jpg','Lorem lipsum dolor sit amet'),
('','banner 7','https://nutech-integrasi.app/dummy.jpg','Lorem lipsum dolor sit amet');


INSERT INTO service (id,service_code,service_name,service_icon,service_tariff) VALUES 
('','PAJAK','Pajak PBB','https://nutech-integrasi.app/dummy.jpg','40000'),
('','PLN','Listrik"','https://nutech-integrasi.app/dummy.jpg','10000'),
('','PDAM','PDAM Berlangganan','https://nutech-integrasi.app/dummy.jpg','40000'),
('','PULSA','Pulsa','https://nutech-integrasi.app/dummy.jpg','40000'),
('','PGN','PGN Berlangganan"','https://nutech-integrasi.app/dummy.jpg','50000'),
('','MUSIK','Musik Berlangganan','https://nutech-integrasi.app/dummy.jpg','50000'),
('','TV','TV Berlangganan','https://nutech-integrasi.app/dummy.jpg','50000'),
('','PAKET_DATA','Paket data','https://nutech-integrasi.app/dummy.jpg','50000'),
('','VOUCHER_GAME','Voucher Game','https://nutech-integrasi.app/dummy.jpg','100000'),
('','VOUCHER_MAKANAN','Voucher Makanan','https://nutech-integrasi.app/dummy.jpg','100000'),
('','QURBAN','Qurban','https://nutech-integrasi.app/dummy.jpg','200000'),
('','ZAKAT','Zakat','https://nutech-integrasi.app/dummy.jpg','300000');
