# Setup Instructions for Crewmate Creator

## Supabase Setup

1. Go to [Supabase](https://supabase.com) and create an account if you don't already have one
2. Create a new project
3. Once your project is created, go to the SQL Editor
4. Run the following SQL to create the required table:

```sql
CREATE TABLE IF NOT EXISTS crewmates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  speed INTEGER DEFAULT 1,
  color TEXT DEFAULT 'red',
  role TEXT DEFAULT 'crew',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

5. Verify your .env file contains the correct Supabase URL and anon key 
   (You can find these in your Supabase dashboard under Settings > API)

6. Start the development server with:
```
npm run dev
```

## Features Implemented

This application includes all required features:

- ✅ Create new crewmates
- ✅ Update existing crewmates from the gallery (summary) page
- ✅ Delete crewmates from the edit page
- ✅ Each crewmate has a unique detail page URL
- ✅ View detailed information about a crewmate on its detail page
- ✅ Navigate to the edit form from the detail page

## Troubleshooting

If you see "Failed to fetch crewmates" error on the Gallery page, this could be because:

1. The "crewmates" table doesn't exist in your Supabase database yet
   - Follow the instructions above to create it

2. Your Supabase credentials are incorrect in the .env file
   - Make sure to use the credentials from your Supabase project settings 