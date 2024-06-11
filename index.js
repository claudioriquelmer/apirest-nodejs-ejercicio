const express = require('express');
const app = express();

app.use(express.json());

const students = [
    {id:1, name: 'NDrake', age: 35, enroll:true},
    {id:2, name: 'Hadita', age: 33, enroll:true},
    {id:3, name: 'Nicol', age: 30, enroll:true},
    {id:4, name: 'Nicolás', age: 27, enroll:true},
];

app.get('/', (req,res) => {
    res.send('NodeJS API');
});

app.get('/api/students', (req, res) => {
    res.send(students);
});

app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Estudiante no Encontrado');
    else res.send(student);
})

app.post('/api/students', (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')
    };

    students.push(student);
    res.send(student);
});

app.delete('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Estudiante no Encontrado');

    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student);
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));