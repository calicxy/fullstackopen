import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculator } from './calculator';
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
        return res.send(calculateBmi(Number(height), Number(weight)));
    } else {
        return res.status(400).json({
            error:"malformatted parameters"
        });
    }
    
})

app.post('/calculate', (req, res) => {
    const { value1, value2, op } = req.body;
  
    const result = calculator(value1, value2, op);
    res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});