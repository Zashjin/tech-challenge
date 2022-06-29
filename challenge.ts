type Results = {
  id: number;
  name: string;
  website: string;
  email: string;
  address: { street: string; city: string; zipcode: string };
};

const getTodoData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todoData = await response.json();
  return todoData;
};

getTodoData().then((todoData) => {
  let todos = todoData;
  console.log(todos);
});

const getUserData = async () => {
  const testUrl = "https://jsonplaceholder.typicode.com/users";
  const response = await fetch(testUrl);
  return await response.json();
};

getUserData().then((data) => {
  let users = data;
  const table = document.getElementById("table") as HTMLTableElement;
  addTableHeader(table as HTMLTableElement);
  users.forEach((user) => addTableData(table as HTMLTableElement, user));
});

const addTableHeader = (table: HTMLTableElement) => {
  const header = table.createTHead();
  const row = header.insertRow(0);
  let cell = document.createElement("th");
  cell.innerHTML = "Name";
  row.appendChild(cell);
  cell = document.createElement("th");
  cell.innerHTML = "Website";
  row.appendChild(cell);
  cell = document.createElement("th");
  cell.innerHTML = "Email";
  row.appendChild(cell);
  cell = document.createElement("th");
  cell.innerHTML = "Address";
  row.appendChild(cell);
};

const addTableData = (table: HTMLTableElement, user: Results) => {
  getTodoData().then((todoData) => {
    let todos = todoData;
    let todosByUser = todos.filter((todo) => todo.userId === user.id);
    var textBoxDiv = document.querySelector(".modal-copy");
    var hidetextBoxDiv = document.querySelector(".modal");
    const row = table.insertRow(1);
    let cell = row.insertCell(0);
    cell.innerHTML = user.name;
    cell = row.insertCell(1);
    cell.innerHTML = user.website;
    cell = row.insertCell(2);
    cell.innerHTML = user.email;
    cell = row.insertCell(3);
    cell.innerHTML = `${user.address.street}, ${user.address.city} ${user.address.zipcode}`;
    row.addEventListener("click", () => {
      if (!textBoxDiv) return;
      const modal = document.getElementById("myModal");
      if (!modal) return;
      modal.style.display = "block";
      textBoxDiv.innerHTML = todosByUser
        .map((todo) => {
          return `<p>${todo.title}</p>`;
        })
        .join("");
    });
    hidetextBoxDiv.addEventListener("click", () => {
      const modal = document.getElementById("myModal");
      if (!modal) return;
      modal.style.display = "none";
    });
});
};
