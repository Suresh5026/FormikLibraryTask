import { Container, Table } from "react-bootstrap";



export default function Dashboard({books,authors}) {
    
    const headings = [
    "S.No",
    "Book Title",
    "ISBN Number",
    "Published Date",
    "Author Name",
    "Author Date of Birth",
    "Author Biography",
    
];
    return (
        <>
        <div className="dashboard-container">
        <h2 className="dashboard-heading">Dash Board</h2>
        <Container className="center-container">
            <Table responsive className="table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        {headings.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                   
                {books.map((book, index) => {
            const author = authors.find((a) => a.name === book.author);
            return (
              <tr key={`${book.id}-${index}`} className="table-primary">
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.isbn}</td>
                <td>{book.datePub}</td>
                <td>{author ? author.name : "Unknown"}</td>
                <td>{author ? author.birthdate : "Unknown"}</td>
                <td>{author ? author.biography : "Unknown"}</td>
              </tr>
            );
          })}

                    
                </tbody>
            </Table>
        </Container>
        </div>
        </>
    );
}
