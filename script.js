function getContacts() {
    let contacts = localStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : [];
}

function saveContacts(contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function renderContacts() {
    const contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = '';

    let contacts = getContacts();

    contacts.forEach((contact, index) => {
        let li = document.createElement('li');
        li.innerHTML = `<span>${contact.name} - ${contact.phone}</span>
                        <button onclick="editContact(${index})">Editar</button>
                        <button onclick="deleteContact(${index})">Excluir</button>`;
        contactsList.appendChild(li);
    });
}


function addContact() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (name && phone && email) {
        let contacts = getContacts();
        contacts.push({ name, phone, email });
        saveContacts(contacts);
        renderContacts();

        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}


function editContact(index) {
    let contacts = getContacts();
    const contact = contacts[index];

    const name = prompt('Editar Nome:', contact.name);
    const phone = prompt('Editar Número de Telefone:', contact.phone);
    const email = prompt('Editar E-mail:', contact.email);

    if (name && phone && email) {
        contacts[index] = { name, phone, email };
        saveContacts(contacts);
        renderContacts();
    }
}


function deleteContact(index) {
    let contacts = getContacts();
    contacts.splice(index, 1);
    saveContacts(contacts);
    renderContacts();
}


document.getElementById('addContactBtn').addEventListener('click', addContact);
renderContacts();
