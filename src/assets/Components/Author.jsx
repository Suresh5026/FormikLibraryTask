import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Formik } from "formik";
import { Form } from "react-bootstrap";

export default function Author() {
  const [author, setAuthor] = useState([]);

  const [editingAuthor, setEditingAuthor] = useState(null);

  useEffect(() => {
    const createdAuthor = localStorage.getItem("author");
    if (createdAuthor) {
      setAuthor(JSON.parse(createdAuthor));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("author", JSON.stringify(author));
    // console.log(author)
  }, [author]);

  const handleDelete = (id) => {
    const updatedAuthors = author.filter((a) => a.id !== id);
    setAuthor(updatedAuthors);
    
  };

  const handleEdit = (author) => {
    setEditingAuthor(author);
  };

  return (
    <>
      <Formik
        initialValues={{
          name: editingAuthor ? editingAuthor.name : "",
          birthdate: editingAuthor ? editingAuthor.birthdate : "",
          biography: editingAuthor ? editingAuthor.biography : "",
        }}
        enableReinitialize
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.birthdate) {
            errors.birthdate = "Required";
          }
          if (!values.biography) {
            errors.biography = "Required";
          }
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (editingAuthor) {
            const updatedAuthors = author.map((a) =>
              a.id === editingAuthor.id ? { ...a, ...values } : a
            );
            setAuthor(updatedAuthors);
            setEditingAuthor(null);
          } else {
            const newAuthor = {
              id: Date.now(),
              name: values.name,
              birthdate: values.birthdate,
              biography: values.biography,
            };
            setAuthor([...author, newAuthor]);
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
          <Form className="w-75 formClass" onSubmit={handleSubmit}>
            <h4 className="mb-4 text-center">
              {editingAuthor ? "Edit Author" : "Add Author"}
            </h4>
            <Form.Group className="mb-1" controlId="name">
              <Form.Label className="text-danger">*</Form.Label>
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                aria-describedby="nameHelp"
                required
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                style={{ textAlign: "start" }}
                isInvalid={touched.name && errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-1" controlId="dob">
              <Form.Label className="text-danger">*</Form.Label>
              <Form.Label>Author DOB</Form.Label>
              <Form.Control
                type="date"
                aria-describedby="dob"
                name="birthdate"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.birthdate}
                style={{ textAlign: "start" }}
                isInvalid={touched.birthdate && errors.birthdate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.birthdate}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-1" controlId="bio">
              <Form.Label className="text-danger">*</Form.Label>
              <Form.Label>Biography</Form.Label>
              <Form.Control
                type="text"
                aria-describedby="bioHelp"
                name="biography"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.biography}
                style={{ textAlign: "start" }}
                isInvalid={touched.biography && errors.biography}
              />
              <Form.Control.Feedback type="invalid">
                {errors.biography}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="success" type="submit" disabled={isSubmitting}>
              {editingAuthor ? "Update Author" : "Add Author"}
            </Button>
            {editingAuthor && (
              <Button
                variant="secondary"
                type="button"
                onClick={() => setEditingAuthor(null)}
                style={{ marginLeft: "10px" }}
              >
                Cancel Edit
              </Button>
            )}
          </Form>
        )}
      </Formik>
      <div className="d-flex flex-wrap mt-4 cards">
      {author.map((author, index) => {
            return (
              
              <div key={author.id}>
        <Card style={{ width: "18rem", margin: "10px" }}>
        <Card.Body>
          
                
                  <Card.Title>Author Name : {author.name}</Card.Title>
                  <Card.Subtitle>Author DOB : {author.birthdate}</Card.Subtitle>
                  <Card.Text> Biography : {author.biography}</Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(author.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleEdit(author)}
                    style={{ marginLeft: "10px" }}
                  >
                    Edit
                  </Button>
                  </Card.Body>
        </Card>
                
              </div>
            );
          })}
          
      </div>
    </>
  );
}
