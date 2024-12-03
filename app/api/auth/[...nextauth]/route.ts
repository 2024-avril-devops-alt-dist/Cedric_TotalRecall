// api/auth/[...nextauth]/route.ts
console.log("------------Dans api/auth/[]/route.ts----------------");
import { handlers } from "@/auth" 
export const { GET, POST } = handlers