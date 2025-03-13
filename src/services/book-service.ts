import bookRepo from '../repository/book-repository'
import { Book } from '../models/book'
import NotFoundError from '../helper/cutom-errors/not-found'

const addBook = (book: Book) => {
  bookRepo.addBook(book)
  return bookRepo.getBookById(book.id)
}

const getBookById = (id: string) => {
  return bookRepo.getBookById(id)
}

const getAllBooks = () => {
  return bookRepo.getAllBook()
}

const deleteBookById = (id: string) => {
  const book = bookRepo.getBookById(id)
  if (!book) {
    throw new NotFoundError('buku tidak ditemukan')
  }
  return bookRepo.deleteBookById(id)
}

const updateBookTitle = (id: string, title: string) => {
  const book = bookRepo.getBookById(id)
  if (book) {
    book.title = title
    return true
  }
  return false
}

export default {
  addBook,
  getBookById,
  getAllBooks,
  deleteBookById,
  updateBookTitle,
}