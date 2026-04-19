import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './services/auth/google.service.js';
import { generalRateLimit } from './middleware/rateLimit.middleware.js';
import { errorResponse } from './utils/response.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(helmet());

app.use(cors({ 
  origin: process.env.CLIENT_URL, 
  credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());

app.use(generalRateLimit);

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  if (err.isOperational) {
    return errorResponse(res, err.message, err.statusCode);
  }

  console.error('[Unhandled Error]', err);
  return errorResponse(res, 'Something went wrong. Please try again.', 500);
});

export default app;

/*
 * ROLE: Bootstraps explicit underlying application settings injecting all generic wide-reaching logic blocks securely handling fundamental server properties and error catching directly natively.
 * FUNCTIONS: None mapped implicitly except routing error fallback injections.
 * ACTIONS: Defines secure CORS boundaries limiting specific origin connections, utilizes helmet to patch structural weaknesses alongside parsing blocks enabling seamless session evaluations dynamically funneling errors directly down gracefully protecting crash vulnerability. 
 * USED BY: server.js.
 */
