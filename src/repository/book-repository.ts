import books, { Book } from '../models/book'

const addBook = (book: Book) => {
  return books.push(book)
}

const getBookById = (id: string) => {
  return books.find(book => book.id === id)
}

const getAllBook = () => {
  return books
}


//menghapus buku berdasarkan pencarian Id
const deleteBookById = (id: string) => {
  // BooksIndex untuk mencari indeks buku dalam array books yang memiliki Id yang sama dengan Id yang dimasukkan
  const BooksIndex = books.findIndex((book) => book.id === id);
  // if untuk cek apakah buku dengan Id yang dimasukkan ada di array
  if (BooksIndex !==-1){
    //splice untuk menghapus 1 elemen di posisi BooksIndex
    books.splice(BooksIndex, 1);
    return true;
  }
  return false;
}

//mengupdate judul buku
const updateBookTitile = (id :string, title: string) => {
  const book = getBookById(id);
  if (book) {
    book.title = title;
    return true
  }
  return false;
}

export default {
  addBook,
  getBookById,
  getAllBook,
  deleteBookById,
  updateBookTitile
}