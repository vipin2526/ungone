# Development Workflow Guide

## Daily Development Routine

### Morning Start (5 minutes)
1. Check dev server is running: `npm run dev`
2. Review project status in TASKS.md
3. Check for any blockers from yesterday
4. Identify 1-2 tasks to complete today

### During Development
- Work on one task at a time
- Test changes as you build
- Commit frequently with meaningful messages
- Update TASKS.md when task status changes

### End of Day (5 minutes)
1. Update TASKS.md with progress
2. Note any blockers or issues
3. Plan tomorrow's tasks
4. Ensure code is committed and pushed

## Task Execution Process

### 1. Select Task
Choose a task from TASKS.md "Ready to Start" section.

### 2. Create Feature Branch
```bash
git checkout -b feature/task-name
```

### 3. Implement
- Follow the feature requirements
- Write code following project conventions
- Test locally as you build
- Document any API changes

### 4. Test
- Manual testing checklist:
  - [ ] Feature works as expected
  - [ ] No console errors
  - [ ] Responsive on different screen sizes
  - [ ] Loading states handled
  - [ ] Error states handled
  - [ ] Empty states handled

### 5. Code Review
- Self-review your changes:
  - [ ] No hardcoded values
  - [ ] Proper error handling
  - [ ] Consistent styling
  - [ ] Security best practices
  - [ ] Clean, readable code

### 6. Commit
```bash
git add .
git commit -m "feat: add feature description"
```

### 7. Merge
```bash
git checkout main
git merge feature/task-name
git push
```

## File Organization

### Adding New API Routes
```
app/api/admin/[feature]/
├── route.ts              # Main CRUD operations
├── [id]/
│   └── route.ts          # Single item operations
└── bulk/
    └── route.ts          # Bulk operations
```

### Adding New Admin Pages
```
app/admin/[feature]/
├── page.tsx              # Main page component
├── components/           # Feature-specific components
│   └── ComponentName.tsx
└── layout.tsx            # Optional feature layout
```

### Database Changes
1. Update `supabase/schema.sql`
2. Document the change in PROJECT_PLAN.md
3. Test migration in development
4. Note breaking changes

## Common Patterns

### API Route Pattern
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Your logic here
    const { data, error } = await supabase.from('table').select('*');

    if (error) {
      return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
```

### Page Component Pattern
```typescript
'use client';

import { useState, useEffect } from 'react';

export default function FeaturePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/feature');
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      {/* Your UI here */}
    </div>
  );
}
```

## Debugging Tips

### Common Issues

**API returns 401**
- Check ADMIN_PASSWORD in .env.local
- Verify cookie is set
- Check admin-auth.ts logic

**Database errors**
- Verify Supabase credentials
- Check table exists in schema
- Review RLS policies

**UI not updating**
- Check state management
- Verify API call is made
- Look for console errors

### Debug Commands
```bash
# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL

# View database logs (in Supabase dashboard)
# Check Next.js logs
# Browser console for client errors
```

## Code Quality Standards

### TypeScript
- Use interfaces for data structures
- Avoid `any` types
- Enable strict mode
- Type all function parameters

### React
- Use functional components
- Prefer hooks over class components
- Avoid prop drilling when possible
- Use appropriate hooks (useState, useEffect, useMemo)

### Styling
- Use Tailwind utility classes
- Follow existing color scheme (zinc, green)
- Maintain consistent spacing
- Ensure responsive design

### API Design
- RESTful conventions
- Consistent response format
- Proper HTTP status codes
- Error messages are user-friendly

## Performance Guidelines

### Optimization Checklist
- [ ] Minimize API calls
- [ ] Use pagination for large datasets
- [ ] Implement caching where appropriate
- [ ] Optimize database queries
- [ ] Lazy load heavy components

### Database Optimization
- Add indexes on frequently queried columns
- Use select() to fetch only needed fields
- Avoid N+1 queries
- Use batch operations for bulk updates

## Security Best Practices

### Must-Haves
- [ ] Authentication on all admin routes
- [ ] Input validation on server
- [ ] Parameterized SQL queries
- [ ] Environment variables for secrets
- [ ] HTTPS in production

### Nice-to-Haves
- [ ] Rate limiting
- [ ] CSRF protection
- [ ] Content Security Policy
- [ ] Regular dependency updates

## Testing Checklist

### Before Marking Task Complete
- [ ] Feature works as described
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop responsive
- [ ] Loading state displayed
- [ ] Error state handled
- [ ] Empty state handled
- [ ] Authentication required
- [ ] No hardcoded values
- [ ] Database changes documented

## Communication

### Daily Updates Format
```
**Completed**: [Task 1], [Task 2]
**In Progress**: [Task 3]
**Blocked**: [Any blockers]
**Next**: [Tomorrow's plan]
```

### Blocker Reporting
If you encounter a blocker:
1. Describe the issue clearly
2. Include error messages
3. Show steps to reproduce
4. Suggest potential solutions
5. Estimate impact on timeline

## Getting Help

### Resources
- PROJECT_PLAN.md - Overall project documentation
- TASKS.md - Current task list
- Supabase docs - Database queries
- Next.js docs - Framework features
- React docs - Component patterns

### When to Ask
- Unsure about approach
- Unexpected errors
- Security concerns
- Architecture decisions
- Performance issues

---

**Remember**: Focus on quality over speed. It's better to do one task well than three tasks poorly.
