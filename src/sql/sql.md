## Table

### products Table

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    slug TEXT UNIQUE NOT NULL,
    discounted_price text,
    regular_price text
);
```

### product_images Table

```sql
CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id),
    image_url TEXT NOT NULL,
    alt_text TEXT,
    image_order INTEGER NOT NULL DEFAULT 1
);
```

## Insert Data Into Tables

Insert Data Into product_images
```

```

