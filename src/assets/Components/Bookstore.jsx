import { useEffect, useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import { Formik } from "formik";

export default function Bookstore() {
  const columnHeadings = [
    "S.No",
    "Title",
    "Author",
    "ISBN Number",
    "Publication Date",
    "Action",
  ];

  const [book, setBook] = useState([]);
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    const createBook = localStorage.getItem("book");
    if (createBook) {
      setBook(JSON.parse(createBook));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("book", JSON.stringify(book));
  }, [book]);

  const handleDeleteBook = (id) => {
    const updatedBooks = book.filter((b) => b.id !== id);
    setBook(updatedBooks);
  };

  const handleEditBook = (book) => {
    setEditBook(book);
  };

  return (
    <Container>
      <div>
        <Formik
          initialValues={{
            title: editBook ? editBook.title : "",
            author: editBook ? editBook.author : "",
            isbn: editBook ? editBook.isbn : "",
            datePub: editBook ? editBook.datePub : "",
          }}
          enableReinitialize
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Required";
            }
            if (!values.author) {
              errors.author = "Required";
            }
            if (!values.isbn) {
              errors.isbn = "Required";
            } else if (!/^\d{13}$/.test(values.isbn)) {
              errors.isbn = "ISBN must be exactly 13 digits";
            } else if (
              book.some(
                (book) => book.isbn === values.isbn && book.id !== editBook?.id
              )
            ) {
              errors.isbn = "ISBN must be unique";
            }
            if (!values.datePub) {
              errors.datePub = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            if (editBook) {
              const updatedBooks = book.map((b) =>
                b.id === editBook.id ? { ...b, ...values } : b
              );
              setBook(updatedBooks);
              setEditBook(null);
            } else {
              const newBook = {
                id: Date.now(),
                title: values.title,
                author: values.author,
                isbn: values.isbn,
                datePub: values.datePub,
              };
              setBook([...book, newBook]);
            }
            resetForm();
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form className="w-75 myForm" onSubmit={handleSubmit}>
              <h4 className="mb-4 text-center">
                {editBook ? "Edit Book" : "Add Book"}
              </h4>
              <Form.Group className="mb-1" controlId="title">
                <Form.Label className="text-danger">*</Form.Label>
                <Form.Label>Book Title</Form.Label>
                <Form.Control
                  type="text"
                  aria-describedby="nameHelp"
                  required
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  style={{ textAlign: "start" }}
                  isInvalid={touched.title && errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-1" controlId="author">
                <Form.Label className="text-danger">*</Form.Label>
                <Form.Label>Author Name</Form.Label>
                <Form.Control
                  type="text"
                  aria-describedby="authorName"
                  required
                  name="author"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.author}
                  style={{ textAlign: "start" }}
                  isInvalid={touched.author && errors.author}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.author}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-1" controlId="isbn">
                <Form.Label className="text-danger">*</Form.Label>
                <Form.Label>ISBN Number</Form.Label>
                <Form.Control
                  type="number"
                  aria-describedby="isbnno"
                  name="isbn"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.isbn}
                  style={{ textAlign: "start" }}
                  isInvalid={touched.isbn && errors.isbn}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.isbn}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-1" controlId="datePub">
                <Form.Label className="text-danger">*</Form.Label>
                <Form.Label>Published Date</Form.Label>
                <Form.Control
                  type="date"
                  aria-describedby="pubDates"
                  name="datePub"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.datePub}
                  style={{ textAlign: "start" }}
                  isInvalid={touched.datePub && errors.datePub}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.datePub}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="success" type="submit" disabled={isSubmitting}>
                {editBook ? "Update Book" : "Add Book"}
              </Button>
              {editBook && (
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => setEditBook(null)}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel Edit
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <div className="d-flex justify-content-between p-1">
          <h1>Book Section</h1>
        </div>
        <Table responsive>
          <thead>
            <tr>
              {columnHeadings.map((heading, index) => (
                <th key={index}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {book.map((books, index) => (
              <tr key={`${books.id}-${index}`}>
                <td>{index + 1}</td>
                <td>{books.title}</td>
                <td>{books.author}</td>
                <td>{books.isbn}</td>
                <td>{books.datePub}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteBook(books.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleEditBook(books)}
                    style={{ marginLeft: "10px" }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
