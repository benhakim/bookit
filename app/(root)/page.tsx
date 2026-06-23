import React from 'react'
import Hero from '@/components/Hero'
import { sampleBooks } from '@/lib/constans';
import BookCard from '@/components/BookCard';

const page = () => {
  return (
    <main className="wrapper container">
      <Hero />
        <div className="library-books-grid">
      {sampleBooks.map((book) => (
        <BookCard key={book._id} title={book.title} author={book.author} 
        slug={book.slug} coverURL={book.coverURL}/>
      ))}
      </div>
    </main>
  )
}

export default page