# Contributing to node-ts-modular-api-starter

Thank you for your interest in contributing to `node-ts-modular-api-starter`! This project is maintained with clean architecture principles, strict TypeScript typing, and automated testing standards.

---

## Code of Conduct
We are committed to providing a friendly, safe, and welcoming environment for everyone, regardless of background or experience level. Please be respectful and constructive in all discussions, issues, and pull requests.

---

## Development Setup

1. **Prerequisites:**
   - Node.js >= 18.0.0 (Node 20.x or 22.x LTS recommended)
   - npm >= 9.0.0

2. **Clone and Install:**
   ```bash
   git clone https://github.com/pkgtm2419/node-ts-modular-api-starter.git
   cd node-ts-modular-api-starter
   npm ci
   cp .env.example .env
   ```

3. **Running the Application:**
   ```bash
   # Development server with live reload
   npm run dev

   # Production build and run
   npm run build
   npm start
   ```

4. **Running Quality Checks:**
   ```bash
   # Run TypeScript static type checking
   npm run lint

   # Run automated Jest unit & integration tests
   npm test

   # Run tests with code coverage report
   npm run test:coverage
   ```

---

## Branching & Commit Conventions

- Create a feature branch from `main`:
  `git checkout -b feat/your-feature-name` or `fix/issue-description`
- Follow [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat(...)`: A new user-facing feature
  - `fix(...)`: A bug fix
  - `docs(...)`: Documentation changes
  - `test(...)`: Adding or updating test suites
  - `refactor(...)`: Code change that neither fixes a bug nor adds a feature
  - `chore(...)`: Build process or tooling changes

---

## Pull Request Process

1. Open an issue describing the bug or feature before submitting large PRs.
2. Link the issue in your PR description (e.g. `Fixes #12`).
3. Ensure all tests pass (`npm test`) and type checking succeeds (`npm run lint && npm run build`).
4. Keep pull requests focused on a single responsibility.
