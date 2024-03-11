import * as fs from "fs/promises";
import { nanoid } from "nanoid";

const contactsPath = "db/contacts.json";

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    return e;
  }
}
export async function getContactById(contactId) {
  try {
    const list = await listContacts();
    return list.find((el) => el.id === contactId) || null;
  } catch (e) {
    return e;
  }
}

export async function removeContact(contactId) {
  try {
    const list = await listContacts();
    const contact = await getContactById(contactId);
    const newList = list.filter((el) => el.id !== contact.id);
    await fs.writeFile(contactsPath, JSON.stringify(newList));
    return contact || null;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function addContact(name, email, phone) {
  try {
    const list = await listContacts();
    const user = { name, email, phone, id: nanoid() };
    list.push(user);
    await fs.writeFile(contactsPath, JSON.stringify(list));
    return user;
  } catch (e) {
    console.log(e);
    return e;
  }
}
