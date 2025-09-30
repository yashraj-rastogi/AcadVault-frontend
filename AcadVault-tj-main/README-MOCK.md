# AcadVault Frontend - Mock Mode

This application now runs entirely with mock data and no backend is required.

## Mock Login Credentials

Use these credentials to test the application:

### Student Account
- **Username:** `student1`
- **Password:** `password123`
- **Role:** Student

### Faculty Account
- **Username:** `faculty1`
- **Password:** `password123`
- **Role:** Faculty

### Admin Account
- **Username:** `admin1`
- **Password:** `password123`
- **Role:** Admin

## What's Changed

1. **Backend Removed:** All backend API calls have been replaced with mock implementations
2. **Mock Data:** Comprehensive mock data is provided for all entities (students, achievements, faculty, etc.)
3. **Simulated API:** The API client now simulates network delays and realistic responses
4. **Local Storage:** Authentication tokens and user data are stored in browser's local storage

## Mock Data Includes

- **Users:** Sample student, faculty, and admin accounts
- **Achievements:** Various types of achievements with different statuses (Approved, Pending, Rejected)
- **Students:** Complete student profiles with academic data
- **Departments:** Academic departments and faculty information
- **Support Tickets:** Sample support requests and help desk items
- **FAQ Data:** Common questions and answers

## Features Working with Mock Data

- ✅ Authentication (login/register)
- ✅ Student dashboard with achievements
- ✅ Achievement management (create, view, update)
- ✅ Faculty student management
- ✅ Portfolio generation
- ✅ Support ticket system
- ✅ Academic records viewing

## Development

To run the application:

```bash
npm install
npm run dev
```

The application will start at `http://localhost:3000` and will work entirely offline with mock data.

## Notes

- All data is stored in memory and will reset when you refresh the page
- Authentication is simulated - any valid mock credentials will work
- File uploads are simulated (no actual files are processed)
- PDF generation works client-side using jsPDF library