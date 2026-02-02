# Environment Variables Setup

Create a `.env.local` file in the root of your project with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Configuration
ADMIN_PASSWORD_HASH=your_bcrypt_hashed_password
```

## How to Get These Values

### Supabase
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to Project Settings > API
3. Copy:
   - `URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### Admin Password
1. Generate a bcrypt hash of your desired password
2. You can use: https://bcrypt-generator.com/
3. Copy the hash → `ADMIN_PASSWORD_HASH`

## Next Steps
After setting up your `.env.local` file, run the SQL schema in `SUPABASE_SCHEMA.sql` in your Supabase SQL Editor.
