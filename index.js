const contactsApi = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "action")
  .option("-i, --id <type>", "id")
  .option("-n, --name <type>", "name")
  .option("-e, --email <type>", "email")
  .option("-p, --phone <type>", "phone");

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      console.table(await contactsApi.listContacts());
      break;
    case "add":
      console.log(await contactsApi.addContact(name, email, phone));
      break;
    case "get":
      console.log(await contactsApi.getContactById(id));
      break;
    case "remove":
      console.log(await contactsApi.removeContact(id));
      break;
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
