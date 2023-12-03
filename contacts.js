const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("db", "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const newContactsList = contacts.filter(
    (contact) => contact.id !== contactId
  );
  const deletedContact = contacts.find((contact) => contact.id === contactId);
  if (contacts.length === newContactsList.length) {
    return null;
  }

  fs.writeFile(contactsPath, JSON.stringify(newContactsList));
  return deletedContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const { nanoid } = await import("nanoid");
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
