#!/bin/bash

# npx supabase login
# npx supabase link --project-ref tziyxqtdtjqdvckuwapg -p <PASSWORD>

npx supabase gen types typescript --project-id tziyxqtdtjqdvckuwapg > utils/database.types.ts