import { Request, Response } from 'express'
import bookService from '../services/book-service'
import bookQuerySchema from './book-validator'
import bookBodySchema from './bookBodySchema'


const addBook = (req: Request, res: Response) => {
  const payload = req.body
  console.log(payload)
  if (!payload || !payload.title || !payload.title.trim()) {
    res.status(400).json({
      message: 'Invalid payload',
    })
    return
  }

  if (!payload.id) {
    payload.id = crypto.randomUUID()
  }

  const book = bookService.addBook(payload)
  res.status(201).json({
    message: 'Success',
    data: book,
  })
}

const getAllBooks = (req: Request, res: Response) => {
  const queryString = bookQuerySchema.parse(req.query)
  let books = bookService.getAllBooks()
  if (queryString.search) {
    books = books.filter ((book) => book.title.toLowerCase().includes(queryString.search!.toLowerCase()))
  }

  res.status(200).json({
    message: 'Success',
    data: books,
  })
}

const getBookById = (req: Request, res: Response) => {
  const { id } = req.params
  const book = bookService.getBookById(id)

  if (!book) {
    res.status(404).json({ message: 'Buku tidak ditemukan' })
  }

  res.status(200).json({
    message: 'Success',
    data: book,
  })
}

const deleteBookById = (req: Request, res: Response) => {
  const { id } = req.params
  const isDeleted = bookService.deleteBookById(id)

  if (!isDeleted) {
    res.status(404).json({ message: 'Buku tidak ditemukan' })
  }

  res.status(200).json({ message: 'Buku berhasil dihapus' })
}

const updateBookTitle = (req: Request, res: Response) => {
  const { id } = req.params
  const { title } = bookBodySchema.pick({ title: true }).parse(req.body) 

  const isUpdated = bookService.updateBookTitle(id, title)

  res.status(200).json({ message: 'Judul buku sudah diperbaharui' })
}

export default {
  addBook,
  getAllBooks,
  getBookById,
  deleteBookById,
  updateBookTitle,
}