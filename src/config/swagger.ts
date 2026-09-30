export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Node.js TypeScript Modular REST API Starter',
    version: '1.0.0',
    description: 'Production-ready modular REST API with JWT, RBAC, Redis Caching, and Zod validation',
    contact: {
      name: 'Pawan Kumar Gautam',
      url: 'https://github.com/pkgtm2419'
    }
  },
  servers: [
    {
      url: 'http://localhost:5000/api/v1',
      description: 'Local Development Server'
    }
  ],
  paths: {
    '/health': {
      get: {
        summary: 'Health check probe',
        responses: {
          '200': { description: 'API is running and healthy' }
        }
      }
    },
    '/auth/register': {
      post: {
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                  role: { type: 'string', enum: ['admin', 'user', 'moderator'] }
                },
                required: ['name', 'email', 'password']
              }
            }
          }
        },
        responses: {
          '201': { description: 'User created' },
          '400': { description: 'Validation failed' }
        }
      }
    },
    '/auth/login': {
      post: {
        summary: 'Login and obtain JWT token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' }
                },
                required: ['email', 'password']
              }
            }
          }
        },
        responses: {
          '200': { description: 'Login successful' },
          '401': { description: 'Invalid credentials' }
        }
      }
    },
    '/users/me': {
      get: {
        summary: 'Get authenticated user profile',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'User profile retrieved' },
          '401': { description: 'Unauthorized' }
        }
      }
    },
    '/users': {
      get: {
        summary: 'List all users (Admin only)',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'List of users' },
          '403': { description: 'Forbidden - requires admin role' }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};
