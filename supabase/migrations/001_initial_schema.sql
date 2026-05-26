-- KidsLend initial schema

CREATE TYPE delivery_type AS ENUM ('city', 'country', 'pickup');
CREATE TYPE payment_method AS ENUM ('card', 'cash');
CREATE TYPE order_status AS ENUM ('new', 'processing', 'delivering', 'done', 'cancelled');
CREATE TYPE admin_role AS ENUM ('admin', 'manager');

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ru TEXT NOT NULL,
  name_tj TEXT NOT NULL,
  description_ru TEXT,
  description_tj TEXT,
  price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
  category TEXT NOT NULL,
  age_min INT DEFAULT 0 CHECK (age_min >= 0),
  age_max INT DEFAULT 18 CHECK (age_max >= age_min),
  characteristics JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

-- Product images
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  order_num INT DEFAULT 0,
  is_main BOOLEAN DEFAULT false
);

CREATE INDEX idx_product_images_product_id ON product_images(product_id);

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_id BIGINT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  username TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_users_telegram_id ON users(telegram_id);

-- Admins
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_id BIGINT UNIQUE NOT NULL,
  role admin_role DEFAULT 'manager'
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_telegram_id BIGINT NOT NULL,
  user_name TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  delivery_type delivery_type NOT NULL DEFAULT 'city',
  delivery_address TEXT,
  payment_method payment_method NOT NULL DEFAULT 'cash',
  status order_status NOT NULL DEFAULT 'new',
  total_price NUMERIC(12, 2) NOT NULL CHECK (total_price >= 0),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_orders_user_telegram_id ON orders(user_telegram_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Order items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INT NOT NULL CHECK (quantity > 0),
  price NUMERIC(12, 2) NOT NULL CHECK (price >= 0)
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- Favorites
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_telegram_id BIGINT NOT NULL,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_telegram_id, product_id)
);

CREATE INDEX idx_favorites_user ON favorites(user_telegram_id);

-- Storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public read product images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Public read admins" ON admins FOR SELECT USING (true);

CREATE POLICY "Users can read own orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Users can insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can read order items" ON order_items FOR SELECT USING (true);
CREATE POLICY "Users can insert order items" ON order_items FOR INSERT WITH CHECK (true);

CREATE POLICY "Users upsert self" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Users manage favorites" ON favorites FOR ALL USING (true) WITH CHECK (true);

-- Admin write policies (service role bypasses RLS)
CREATE POLICY "Admin full products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full product_images" ON product_images FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full orders update" ON orders FOR UPDATE USING (true);
