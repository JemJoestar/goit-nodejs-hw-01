const contactsApi = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program.option("-a, --action <type>", "action")
  .option("-i, --id <type>", "id")
  .option("-n, --name <type>", "name")
  .option("-e, --email <type>", "email")
  .option("-p, --phone <type>", "phone")
  
  program.parse(process.argv);
console.log(
  `parce`,
  process.argv
);
const argv = program.opts();
console.log(`program.opts():`, program.opts())
console.log(`argv:`, argv);

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      console.table(await contactsApi.listContacts());
      break;
    case "add":
      return await contactsApi.addContact(name, email, phone);
    case "find":
      return await contactsApi.getContactById(id);
    case "remove":
      return await contactsApi.removeContact(id);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);

// contactsApi.removeContact("rsKkOQUi80UsgVPCcLZZW") // ~ Remove contact
// contactsApi
//   .getContactById("C9sjBfCo4UJCjzBnOtxl")
//   .then((data) => console.log(data)); // ~ Contact by id
// contactsApi.addContact("Ella", "ellashi@gmail.com", "+380953213984") // ~ Add contact
