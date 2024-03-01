import express, { Request, Response, NextFunction } from 'express';

import todoRoutes from './routes/todos';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/todos', todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message})
})

const portNo = 5151;

app.listen(5151, () => {
    console.log(`Server started running on port: ${portNo}`);
});