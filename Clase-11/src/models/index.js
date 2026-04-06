// ============================================================
// Archivo central de modelos y relaciones de la base de datos
// Aquí se importan todos los modelos y se definen cómo se
// relacionan entre sí (quién pertenece a quién).
// ============================================================

// Importamos la conexión a la base de datos
import sequelize from "../config/db.js";

// Importamos cada uno de los modelos (tablas de la BD)
import Author from "./Author.js"; // Modelo de Autor
import Book from "./Book.js"; // Modelo de Libro
import User from "./User.js"; // Modelo de Usuario
import Review from "./Review.js"; // Modelo de Reseña
import Loan from "./Loan.js"; // Modelo de Préstamo

// ============================================================
// RELACIONES (Asociaciones entre tablas)
// ============================================================

// --- Un Autor tiene muchos Libros (1 autor → N libros) ---
// hasMany  = "tiene muchos"  → Un autor puede tener varios libros
// belongsTo = "pertenece a"  → Cada libro pertenece a un solo autor
// foreignKey: la columna en la tabla "libro" que conecta con "autor"
// as: el alias que usamos para acceder a los datos relacionados

Author.hasMany(Book, {
  foreignKey: "authorId", // Columna en Book que referencia al Author
  as: "books", // Alias: author.books → obtienes sus libros
});

Book.belongsTo(Author, {
  foreignKey: "authorId", // Misma columna, vista desde el otro lado
  as: "author", // Alias: book.author → obtienes el autor del libro
});

// --- Un Usuario tiene muchas Reseñas (1 usuario → N reseñas) ---
// Un usuario puede escribir varias reseñas sobre distintos libros

User.hasMany(Review, {
  foreignKey: "userId", // Columna en Review que referencia al User
  as: "reviews", // Alias: user.reviews → obtienes sus reseñas
});

Review.belongsTo(User, {
  foreignKey: "userId",
  as: "user", // Alias: review.user → obtienes quién escribió la reseña
});

// --- Un Usuario tiene muchos Préstamos (1 usuario → N préstamos) ---
// Un usuario puede pedir prestados varios libros

User.hasMany(Loan, {
  foreignKey: "userId", // Columna en Loan que referencia al User
  as: "loans", // Alias: user.loans → obtienes sus préstamos
});

Loan.belongsTo(User, {
  foreignKey: "userId",
  as: "user", // Alias: loan.user → obtienes quién pidió el préstamo
});

// --- Un Libro tiene muchas Reseñas (1 libro → N reseñas) ---
// Un libro puede recibir varias reseñas de distintos usuarios

Book.hasMany(Review, {
  foreignKey: "bookId", // Columna en Review que referencia al Book
  as: "reviews", // Alias: book.reviews → obtienes las reseñas del libro
});

Review.belongsTo(Book, {
  foreignKey: "bookId",
  as: "book", // Alias: review.book → obtienes de qué libro es la reseña
});

// --- Un Libro tiene muchos Préstamos (1 libro → N préstamos) ---
// Un mismo libro puede ser prestado varias veces (en distintas fechas)

Book.hasMany(Loan, {
  foreignKey: "bookId", // Columna en Loan que referencia al Book
  as: "loans", // Alias: book.loans → obtienes los préstamos del libro
});

Loan.belongsTo(Book, {
  foreignKey: "bookId",
  as: "book", // Alias: loan.book → obtienes qué libro se prestó
});

// ============================================================
// EXPORTACIÓN Y DOCUMENTACIÓN DE USO
// ============================================================

// Exportamos todo para poder usarlo en otras partes del proyecto
// Ejemplo de uso: import { Author, Book } from "./models/index.js"
export { sequelize, Author, Book, User, Review, Loan };

// ============================================================
// 📚 GUÍA DE USO DE LAS RELACIONES
// ============================================================

/*

## 1️⃣ CONSULTAS BÁSICAS CON RELACIONES

### Obtener un autor con todos sus libros:
```javascript
const author = await Author.findByPk(1, {
  include: 'books'  // Usa el alias definido en hasMany
});
console.log(author.books); // Array de libros
```

### Obtener un libro con su autor:
```javascript
const book = await Book.findByPk(1, {
  include: 'author'  // Usa el alias definido en belongsTo
});
console.log(book.author.name); // Nombre del autor
```

### Obtener un usuario con todas sus reseñas:
```javascript
const user = await User.findByPk(1, {
  include: 'reviews'
});
```

### Obtener un usuario con todos sus préstamos:
```javascript
const user = await User.findByPk(1, {
  include: 'loans'
});
```

## 2️⃣ CONSULTAS ANIDADAS (RELACIONES MÚLTIPLES)

### Libro con autor y todas sus reseñas (incluyendo usuarios):
```javascript
const book = await Book.findByPk(1, {
  include: [
    { model: Author, as: 'author' },
    { 
      model: Review, 
      as: 'reviews',
      include: { model: User, as: 'user' }  // Usuario de cada reseña
    }
  ]
});
```

### Usuario con préstamos y libros incluidos:
```javascript
const user = await User.findByPk(1, {
  include: {
    model: Loan,
    as: 'loans',
    include: { 
      model: Book, 
      as: 'book',
      include: { model: Author, as: 'author' }
    }
  }
});
```

### Autor con libros, reseñas y préstamos:
```javascript
const author = await Author.findByPk(1, {
  include: {
    model: Book,
    as: 'books',
    include: [
      { model: Review, as: 'reviews', include: { model: User, as: 'user' } },
      { model: Loan, as: 'loans', include: { model: User, as: 'user' } }
    ]
  }
});
```

## 3️⃣ CONSULTAS CON FILTROS

### Libros de un autor específico:
```javascript
const books = await Book.findAll({
  where: { authorId: 1 }
});
```

### Préstamos activos de un usuario:
```javascript
const activeLoans = await Loan.findAll({
  where: { 
    userId: 1,
    endDate: { [Op.gte]: new Date() }  // Fecha fin >= hoy
  },
  include: { model: Book, as: 'book' }
});
```

### Reseñas de un libro con paginación:
```javascript
const reviews = await Review.findAll({
  where: { bookId: 1 },
  include: { model: User, as: 'user' },
  limit: 10,
  offset: 0,
  order: [['id', 'DESC']]
});
```

## 4️⃣ CREAR REGISTROS CON RELACIONES

### Crear un libro y asignarlo a un autor:
```javascript
const newBook = await Book.create({
  name: "El Quijote",
  authorId: 1  // ID del autor existente
});
```

### Crear una reseña:
```javascript
const review = await Review.create({
  userId: 1,
  bookId: 1,
  comment: "¡Excelente libro!"
});
```

### Crear un préstamo:
```javascript
const loan = await Loan.create({
  userId: 1,
  bookId: 1,
  startDate: "2026-03-01",
  endDate: "2026-03-15"
});
```

## 5️⃣ BUENAS PRÁCTICAS

- Usa `include` para cargar relaciones en lugar de hacer múltiples consultas
- Usa los alias definidos ('books', 'author', 'reviews', etc.)
- Aprovecha las relaciones bidireccionales (hasMany ↔ belongsTo)
- Considera agregar índices en las foreign keys para mejor rendimiento
- Define acciones CASCADE si deseas eliminar registros relacionados automáticamente

Consulta el archivo ER.md para ver el diagrama completo del modelo.
*/
