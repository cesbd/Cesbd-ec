import { column, defineDb, defineTable, NOW } from 'astro:db';

const RegisterUsers = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    lastName: column.text(),
    email: column.text(),
    password: column.text(),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW })
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: { RegisterUsers }
});
