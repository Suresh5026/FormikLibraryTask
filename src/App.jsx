import { Routes, Route, Link } from "react-router-dom";
import Bookstore from "./assets/Components/Bookstore";
import Author from "./assets/Components/Author";
import Dashboard from "./assets/Components/Dashboard";
import { useState, useEffect } from "react";
import Navbarc from "./assets/Components/Navbarc";

function App() {
  const [book, setBook] = useState([]);
  const [author, setAuthor] = useState([]);
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("book"));
    if (storedBooks) {
      setBook(storedBooks);
    }
  }, []);
  useEffect(() => {
    const storedAuthor = JSON.parse(localStorage.getItem("author"));
    if (storedAuthor) {
      setAuthor(storedAuthor);
    }
  }, []);

  return (
    <>
    <Navbarc />
      <Routes>
        <Route element={<Dashboard books={book} authors={author} />} path="/" />
        <Route
          element={<Bookstore books={book} setBook={setBook} />}
          path="/bookstore"
        />
        <Route
          element={<Author authors={author} setAuthor={setAuthor} />}
          path="/author"
        />
      </Routes>
    </>
  );
}

export default App;
