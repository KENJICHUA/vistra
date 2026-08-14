# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Handling Dependencies

### Installing Missing Dependencies

If you encounter missing dependencies after pulling the latest changes, install them using the appropriate command below.

#### Backend

Navigate to the `VISTRA/backend` directory, then run:

```bash
pip install -r requirements.txt
```

#### Frontend

Navigate to the `VISTRA/frontend` directory, then run:

```bash
npm install
```

> **Note:** Make sure your terminal's current working directory is the correct project folder before running the commands.

---

## Running the Backend FastAPI Server

### Prerequisites

- Python 3.7 or higher
- pip (Python package manager)

### Installation Steps

1. **Navigate to the backend directory:**
   ```bash
   cd VISTRA/backend
   ```

2. **Create a virtual environment (optional but recommended):**
   ```bash
   # On Windows (PowerShell)
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   
   # On Windows (Command Prompt)
   python -m venv venv
   venv\Scripts\activate.bat
   
   # On macOS/Linux
   python -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

### Running the Server

**Start the FastAPI development server:**
```bash
uvicorn app.main:app --reload
```

The server will start on `http://localhost:8000` by default.

**To access the API documentation:**
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

**Custom host and port (if needed):**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Environment Variables

Make sure to set up any required environment variables. Create a `.env` file in the `backend` directory with necessary configurations (check `app/config/settings.py` for required variables).

---

### Adding New Dependencies

If you install a new library or module, update the project's dependency file before committing your changes so that everyone else can install the new dependency.

#### Backend (Python)

After installing a new package:

```bash
pip install <package-name>
pip freeze > requirements.txt
```

Commit the updated `requirements.txt` along with your code changes.

#### Frontend (Node.js)

Install the package using npm:

```bash
npm install <package-name>
```

The `package.json` and `package-lock.json` files will be updated automatically. Commit both files along with your code changes.
