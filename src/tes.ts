// console.log(process.env.NAMA_VARIABEL)

import { z } from "zod";

// creating a schema for strings
const stringSchema = z.string();

// parsing
stringSchema.parse("tuna"); // => "tuna"
stringSchema.parse(12); // => throws ZodError

// creating object schema
const User = z.object({
  username: z.string(),
});

User.parse({ username: "Ludwig" });

// extract the inferred type
type User = z.infer<typeof User>;
// { username: string }