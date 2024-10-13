import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/authRoutes";
import teacherRouter from "./routes/teacherRoutes";
import studentRouter from "./routes/studentRoutes"
import { errorHandler } from "./middlewares/errorHandler"
import connectDB from "./config/db"
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())

connectDB()

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Classroom API',
      version: '1.0.0',
      description: 'API for managing classroom activities',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api/students", studentRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/auth", authRouter);

// Error handling middleware
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app
