                    # 📚 Modelo Entidad-Relación - Sistema de Biblioteca

## 🎯 Descripción General

Este sistema gestiona una biblioteca digital que permite:

- Registrar autores y sus libros
- Gestionar usuarios de la biblioteca
- Controlar préstamos de libros
- Almacenar reseñas de usuarios sobre libros

---

## 📊 Diagrama Entidad-Relación

```
                    ┌─────────────────────┐
                    │      AUTHOR         │
                    │  ┌───────────────┐  │
                    │  │ id (PK)       │  │
                    │  │ name          │  │
                    │  └───────────────┘  │
                    └──────────┬──────────┘
                               │
                               │ 1:N (Un autor → muchos libros)
                               │ hasMany / belongsTo
                               │
                    ┌──────────▼──────────┐
            ┌───────│       BOOK          │───────┐
            │       │  ┌───────────────┐  │       │
            │       │  │ id (PK)       │  │       │
            │       │  │ name          │  │       │
            │       │  │ authorId (FK) │  │       │
            │       │  └───────────────┘  │       │
            │       └──────────┬──────────┘       │
            │                  │                  │
            │ 1:N              │ 1:N              │ 1:N
            │ hasMany/         │ hasMany/         │ hasMany/
            │ belongsTo        │ belongsTo        │ belongsTo
            │                  │                  │
     ┌──────▼──────┐    ┌──────▼──────┐    ┌─────▼──────┐
     │   REVIEW    │    │    LOAN     │    │    USER    │
     │ ┌─────────┐ │    │ ┌─────────┐ │◄───┤ ┌────────┐ │
     │ │id (PK)  │ │    │ │id (PK)  │ │    │ │id (PK) │ │
     │ │userId   │ │    │ │userId   │ │    │ │name    │ │
     │ │bookId   │ │    │ │bookId   │ │    │ │age     │ │
     │ │comment  │ │    │ │startDate│ │    │ │address │ │
     │ └─────────┘ │    │ │endDate  │ │    │ └────────┘ │
     └──────▲──────┘    └─────────────┘    └────┬───────┘
            │                                    │
            │ 1:N                                │ 1:N
            │ hasMany / belongsTo                │ hasMany / belongsTo
            │                                    │
            └────────────────────────────────────┘
```

---

## 📋 Entidades y Atributos

### 1️⃣ AUTHOR (Autor)

Representa a los autores de los libros en la biblioteca.

| Atributo | Tipo    | Restricciones      | Descripción                   |
| -------- | ------- | ------------------ | ----------------------------- |
| `id`     | INTEGER | PK, AUTO_INCREMENT | Identificador único del autor |
| `name`   | STRING  | NOT NULL           | Nombre completo del autor     |

**Relaciones:**

- ✅ Un autor puede tener **muchos libros** (`hasMany` → Book)

---

### 2️⃣ BOOK (Libro)

Representa los libros disponibles en la biblioteca.

| Atributo   | Tipo    | Restricciones      | Descripción                          |
| ---------- | ------- | ------------------ | ------------------------------------ |
| `id`       | INTEGER | PK, AUTO_INCREMENT | Identificador único del libro        |
| `name`     | STRING  | NOT NULL           | Título del libro                     |
| `authorId` | INTEGER | FK, NULL           | Referencia al autor (puede ser nulo) |

**Relaciones:**

- ✅ Un libro pertenece a **un autor** (`belongsTo` → Author)
- ✅ Un libro puede tener **muchas reseñas** (`hasMany` → Review)
- ✅ Un libro puede tener **muchos préstamos** (`hasMany` → Loan)

---

### 3️⃣ USER (Usuario)

Representa a los usuarios registrados en la biblioteca.

| Atributo  | Tipo    | Restricciones      | Descripción                      |
| --------- | ------- | ------------------ | -------------------------------- |
| `id`      | INTEGER | PK, AUTO_INCREMENT | Identificador único del usuario  |
| `name`    | STRING  | NOT NULL           | Nombre completo del usuario      |
| `age`     | INTEGER | NULL               | Edad del usuario (opcional)      |
| `address` | STRING  | NULL               | Dirección del usuario (opcional) |

**Relaciones:**

- ✅ Un usuario puede escribir **muchas reseñas** (`hasMany` → Review)
- ✅ Un usuario puede tener **muchos préstamos** (`hasMany` → Loan)

---

### 4️⃣ REVIEW (Reseña)

Representa las reseñas que los usuarios hacen sobre los libros.

| Atributo  | Tipo    | Restricciones      | Descripción                        |
| --------- | ------- | ------------------ | ---------------------------------- |
| `id`      | INTEGER | PK, AUTO_INCREMENT | Identificador único de la reseña   |
| `userId`  | INTEGER | FK, NOT NULL       | Referencia al usuario que escribió |
| `bookId`  | INTEGER | FK, NOT NULL       | Referencia al libro reseñado       |
| `comment` | STRING  | NOT NULL           | Comentario/texto de la reseña      |

**Relaciones:**

- ✅ Una reseña pertenece a **un usuario** (`belongsTo` → User)
- ✅ Una reseña pertenece a **un libro** (`belongsTo` → Book)

---

### 5️⃣ LOAN (Préstamo)

Representa los préstamos de libros a usuarios.

| Atributo    | Tipo     | Restricciones      | Descripción                      |
| ----------- | -------- | ------------------ | -------------------------------- |
| `id`        | INTEGER  | PK, AUTO_INCREMENT | Identificador único del préstamo |
| `userId`    | INTEGER  | FK, NOT NULL       | Referencia al usuario que pide   |
| `bookId`    | INTEGER  | FK, NOT NULL       | Referencia al libro prestado     |
| `startDate` | DATEONLY | NOT NULL           | Fecha de inicio del préstamo     |
| `endDate`   | DATEONLY | NOT NULL           | Fecha de devolución del préstamo |

**Relaciones:**

- ✅ Un préstamo pertenece a **un usuario** (`belongsTo` → User)
- ✅ Un préstamo pertenece a **un libro** (`belongsTo` → Book)

---

## 🔗 Resumen de Relaciones

| Tabla      | Relación con | Tipo | Foreign Key | Alias     | Descripción                             |
| ---------- | ------------ | ---- | ----------- | --------- | --------------------------------------- |
| **Author** | Book         | 1:N  | -           | `books`   | Un autor escribe muchos libros          |
| **Book**   | Author       | N:1  | `authorId`  | `author`  | Cada libro tiene un autor               |
| **Book**   | Review       | 1:N  | -           | `reviews` | Un libro recibe muchas reseñas          |
| **Book**   | Loan         | 1:N  | -           | `loans`   | Un libro puede prestarse varias veces   |
| **User**   | Review       | 1:N  | -           | `reviews` | Un usuario escribe muchas reseñas       |
| **User**   | Loan         | 1:N  | -           | `loans`   | Un usuario puede tener varios préstamos |
| **Review** | User         | N:1  | `userId`    | `user`    | Cada reseña es de un usuario            |
| **Review** | Book         | N:1  | `bookId`    | `book`    | Cada reseña es sobre un libro           |
| **Loan**   | User         | N:1  | `userId`    | `user`    | Cada préstamo es de un usuario          |
| **Loan**   | Book         | N:1  | `bookId`    | `book`    | Cada préstamo es de un libro            |

---

## 🔍 Explicación Técnica de Relaciones (Sequelize)

### 1. Author ↔ Book (1:N)

```javascript
// Un autor tiene muchos libros
Author.hasMany(Book, {
  foreignKey: "authorId", // Columna en Book que conecta con Author
  as: "books", // Alias: author.books
});

// Un libro pertenece a un autor
Book.belongsTo(Author, {
  foreignKey: "authorId", // Misma columna, vista desde Book
  as: "author", // Alias: book.author
});
```

**Ejemplo de uso:**

```javascript
// Obtener un autor con todos sus libros
const author = await Author.findByPk(1, { include: "books" });
console.log(author.books); // Array de libros del autor

// Obtener un libro con su autor
const book = await Book.findByPk(1, { include: "author" });
console.log(book.author.name); // Nombre del autor
```

---

### 2. User ↔ Review (1:N)

```javascript
// Un usuario tiene muchas reseñas
User.hasMany(Review, {
  foreignKey: "userId",
  as: "reviews",
});

// Una reseña pertenece a un usuario
Review.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
```

**Ejemplo de uso:**

```javascript
// Obtener un usuario con todas sus reseñas
const user = await User.findByPk(1, { include: "reviews" });

// Obtener una reseña con el usuario que la escribió
const review = await Review.findByPk(1, { include: "user" });
```

---

### 3. User ↔ Loan (1:N)

```javascript
// Un usuario tiene muchos préstamos
User.hasMany(Loan, {
  foreignKey: "userId",
  as: "loans",
});

// Un préstamo pertenece a un usuario
Loan.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
```

**Ejemplo de uso:**

```javascript
// Obtener un usuario con todos sus préstamos activos
const user = await User.findByPk(1, { include: "loans" });

// Obtener un préstamo con información del usuario
const loan = await Loan.findByPk(1, { include: "user" });
```

---

### 4. Book ↔ Review (1:N)

```javascript
// Un libro tiene muchas reseñas
Book.hasMany(Review, {
  foreignKey: "bookId",
  as: "reviews",
});

// Una reseña pertenece a un libro
Review.belongsTo(Book, {
  foreignKey: "bookId",
  as: "book",
});
```

**Ejemplo de uso:**

```javascript
// Obtener un libro con todas sus reseñas
const book = await Book.findByPk(1, { include: "reviews" });

// Obtener una reseña con el libro reseñado
const review = await Review.findByPk(1, { include: "book" });
```

---

### 5. Book ↔ Loan (1:N)

```javascript
// Un libro tiene muchos préstamos
Book.hasMany(Loan, {
  foreignKey: "bookId",
  as: "loans",
});

// Un préstamo pertenece a un libro
Loan.belongsTo(Book, {
  foreignKey: "bookId",
  as: "book",
});
```

**Ejemplo de uso:**

```javascript
// Obtener un libro con todos sus préstamos históricos
const book = await Book.findByPk(1, { include: "loans" });

// Obtener un préstamo con el libro prestado
const loan = await Loan.findByPk(1, { include: "book" });
```

---

## 📌 Consultas Complejas con Múltiples Relaciones

### Ejemplo 1: Libro completo con autor y reseñas

```javascript
const book = await Book.findByPk(1, {
  include: [
    { model: Author, as: "author" },
    {
      model: Review,
      as: "reviews",
      include: { model: User, as: "user" }, // Incluir usuario de cada reseña
    },
  ],
});
```

### Ejemplo 2: Usuario con sus préstamos y libros

```javascript
const user = await User.findByPk(1, {
  include: [
    {
      model: Loan,
      as: "loans",
      include: {
        model: Book,
        as: "book",
        include: { model: Author, as: "author" },
      },
    },
  ],
});
```

### Ejemplo 3: Autor con sus libros y sus reseñas

```javascript
const author = await Author.findByPk(1, {
  include: [
    {
      model: Book,
      as: "books",
      include: [
        { model: Review, as: "reviews" },
        { model: Loan, as: "loans" },
      ],
    },
  ],
});
```

---

## 📝 Notas Importantes

### Integridad Referencial

- **Foreign Keys:** Las columnas `authorId`, `userId`, `bookId` son claves foráneas que mantienen la integridad referencial
- **NULL:** Solo `authorId` en Book permite valores NULL (libros sin autor asignado)
- **Cascadas:** Considera definir `onDelete` y `onUpdate` en producción para manejar eliminaciones

### Convenciones de Nombres

- **Tablas:** minúsculas sin pluralizar (`author`, `book`, `user`)
- **Modelos:** PascalCase (`Author`, `Book`, `User`)
- **Alias:** camelCase plural para 1:N (`books`, `reviews`, `loans`)
- **Alias:** camelCase singular para N:1 (`author`, `user`, `book`)

### Timestamps

- Actualmente `timestamps: false` en todos los modelos
- Considera habilitar `timestamps: true` para tener `createdAt` y `updatedAt` automáticos

---

## 🎓 Conceptos Clave

- **hasMany:** "Tiene muchos" - Define la relación 1:N desde el lado "uno"
- **belongsTo:** "Pertenece a" - Define la relación N:1 desde el lado "muchos"
- **foreignKey:** Columna que almacena la referencia a otra tabla
- **as:** Alias para acceder a los datos relacionados en las consultas
