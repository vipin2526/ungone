# Quick Start Guide

## Setup Instructions

### 1. Environment Setup
Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ADMIN_PASSWORD=your_secure_admin_password
```

### 2. Database Setup
Run the schema migrations in Supabase:
```sql
-- Open supabase/schema.sql and execute in Supabase SQL Editor
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Access Admin Panel
- Navigate to: `http://localhost:3000/admin/login`
- Login with your ADMIN_PASSWORD

## Project Structure Overview

```
ungone/
├── app/
│   ├── admin/           # Admin panel pages
│   ├── api/             # API routes
│   └── components/      # Shared components
├── lib/                 # Utility functions
├── supabase/            # Database schema
└── public/              # Static assets
```

## Key Files

### Configuration
- `.env.local` - Environment variables
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration

### Core Files
- `lib/admin-auth.ts` - Authentication logic
- `lib/supabase.ts` - Supabase client
- `supabase/schema.sql` - Database schema

### Admin Pages
- `app/admin/page.tsx` - Dashboard
- `app/admin/leads/page.tsx` - Lead management
- `app/admin/analytics/page.tsx` - Analytics
- `app/admin/newsletter/page.tsx` - Newsletter

### API Routes
- `app/api/admin/leads/route.ts` - Leads API
- `app/api/admin/newsletter/route.ts` - Newsletter API
- `app/api/admin/login/route.ts` - Authentication

## Common Commands

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run linter
```

### Database
```bash
# Run schema migrations in Supabase SQL Editor
# Open: https://app.supabase.com/project/[your-project]/sql
```

## Development Workflow

### 1. Pick a Task
Check `TASKS.md` for available tasks.

### 2. Create Branch
```bash
git checkout -b feature/task-name
```

### 3. Implement & Test
- Write code following project conventions
- Test manually in browser
- Check console for errors

### 4. Commit
```bash
git add .
git commit -m "feat: description"
```

### 5. Merge
```bash
git checkout main
git merge feature/task-name
```

## Testing Admin Panel

### Authentication
1. Go to `/admin/login`
2. Enter admin password
3. Verify you're redirected to `/admin`

### Dashboard
1. Check statistics display correctly
2. Verify recent leads list
3. Test quick action buttons

### Leads Management
1. Search for leads
2. Filter by status
3. Update lead status
4. Add notes to lead
5. Test bulk operations
6. Export to CSV
7. View activity timeline

### Analytics
1. Change time range
2. Check metrics accuracy
3. View charts

### Newsletter
1. View subscribers
2. Search by email
3. Export to CSV
4. Copy emails

## Troubleshooting

### Authentication Issues
- Check ADMIN_PASSWORD in .env.local
- Clear browser cookies
- Restart dev server

### Database Issues
- Verify Supabase credentials
- Check table exists in schema
- Review RLS policies

### Build Errors
- Run `npm install` to update dependencies
- Check TypeScript errors
- Review console logs

## Resources

### Documentation
- `PROJECT_PLAN.md` - Comprehensive project documentation
- `TASKS.md` - Current task list
- `WORKFLOW.md` - Development workflow guide

### External Docs
- [Next.js](https://nextjs.org/docs)
- [Supabase](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React](https://react.dev)

## Support

### Getting Help
1. Check documentation files
2. Review error messages
3. Check browser console
4. Review API responses in Network tab

### Common Issues
- **Port 3000 in use**: Kill process or use different port
- **Environment variables not loading**: Restart dev server
- **Database connection failed**: Check Supabase credentials
- **TypeScript errors**: Run `npm install` to update types

## Next Steps

1. ✅ Complete setup
2. ✅ Run dev server
3. ✅ Test admin panel
4. 📋 Pick a task from TASKS.md
5. 🚀 Start building!

---

**Need help?** Check the documentation files or review the code comments.
