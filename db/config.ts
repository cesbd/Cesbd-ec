import { column, defineDb, defineTable, NOW } from 'astro:db';

const RegisterUser = defineTable({
  columns: {
    regiter_user_id: column.number({ primaryKey: true }),

    // datos de usuario
    ci: column.text(),
    name: column.text(),
    last_name: column.text(),
    email: column.text(),
    city: column.text(),
    phone_number: column.text(),
    born_date: column.date(),
    major: column.text(),
    business_type: column.text(),
    file_url: column.text({ optional: true }),

    form_type_id: column.number(),

    register_date: column.date({ default: NOW }),
  },
  foreignKeys: [
    {
      columns: ['form_type_id'],
      references: () => [FormTye.columns.id],
    }
  ],
  indexes: [
    {
      unique: true,
      on: ['ci', 'email', 'phone_number'],
      name: 'unique_users'
    },
  ]
});

const FormTye = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    event_name: column.text(),
    event_type: column.text(),
    event_location: column.text(),
    event_date: column.date(),
    brand: column.text(),
    staff: column.text(),
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: { RegisterUser, FormTye }
});
