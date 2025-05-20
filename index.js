import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import connectDB from './src/config/database.js';
import { PORT } from './src/config/configuration.js';
import loginRoutes from './src/routes/loginRoute.js';
import merchantRoutes from "./src/routes/merchantRoute.js";
import { errorHandler } from './src/middleware/errorHandler.js';
import masterProductRoutes from "./src/routes/masterProductRoute.js";
const app = express();

connectDB();

app.use(cors());
app.use(morgan('tiny'));

app.use(express.json());

app.use('/api/login', loginRoutes);
app.use('/api/merchant', merchantRoutes);
app.use('/api/masterProducts', masterProductRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
