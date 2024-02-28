// Importando o Módulo do Express 
const express = require('express')

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

let books = [
    {id: 1, title: 'livro 1'},
    {id: 2, title: 'livro 2'},
    {id: 3, title: 'livro 3'}
]

app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/books', (req, res) => {
    const newBook = req.body; //resgata as informações passada no corpo da requisição
    books.push(newBook);
    res.json(newBook);
});

app.put('/update-book/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const newTitle = req.body.title;

    const bookToUpdate = books.find(book => book.id === bookId);
    
    if(bookToUpdate) {
        bookToUpdate.title = newTitle;
        res.json(bookToUpdate);
    } else {
        res.status(404).send("livro não encontrado");
    }
});

app.delete('/delete-book/:id', (req, res) => {
    const bookId = parseInt(req.params.id); //resgata o id por parametro

    const indexToRemove = books.findIndex(book => book.id === bookId);
    
    if(indexToRemove !== -1) {
        const removeBook = books.splice(indexToRemove, 1);
        res.json(removeBook[0]);
    } else {
        res.status(404).send("livro não encontrado");
    }
});



const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`server started ${PORT}`));