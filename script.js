
const form = document.getElementById("itemForm");
const itemList = document.getElementById("itemList");
const searchInput = document.getElementById("searchInput");

let items = JSON.parse(localStorage.getItem("collegeItems") || "[]");
let currentFilter = "All";

function saveItems() {
    localStorage.setItem("collegeItems", JSON.stringify(items));
}

function renderItems() {
    const query = searchInput.value.toLowerCase().trim();

    const filtered = items.filter(item => {
        const text = [
            item.name,
            item.category,
            item.location,
            item.description
        ].join(" ").toLowerCase();

        return text.includes(query) &&
            (currentFilter === "All" || item.status === currentFilter);
    });

    itemList.innerHTML = "";

    if (filtered.length === 0) {
        itemList.textContent = "No items found.";
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement("div");
        card.className = "item-card";

        const title = document.createElement("h3");
        title.textContent = item.name;

        const details = document.createElement("p");
        details.textContent =
            item.category + " | " + item.location + " | " + item.date;

        const description = document.createElement("p");
        description.textContent = item.description;

        const status = document.createElement("p");
        status.className = "status";
        status.textContent = "Status: " + item.status;

        const statusButton = document.createElement("button");
        statusButton.textContent =
            item.status === "Returned" ? "Mark Active" : "Mark Returned";

        statusButton.onclick = () => {
            item.status = item.status === "Returned" ? item.type : "Returned";
            saveItems();
            renderItems();
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.onclick = () => {
            items = items.filter(x => x.id !== item.id);
            saveItems();
            renderItems();
        };

        card.append(title, details, description, status,
                    statusButton, deleteButton);
        itemList.appendChild(card);
    });
}

form.addEventListener("submit", event => {
    event.preventDefault();

    const item = {
        id: Date.now(),
        name: document.getElementById("itemName").value.trim(),
        type: document.getElementById("itemType").value,
        category: document.getElementById("category").value,
        location: document.getElementById("location").value.trim(),
        date: document.getElementById("itemDate").value,
        description: document.getElementById("description").value.trim(),
        status: document.getElementById("itemType").value
    };

    items.unshift(item);
    saveItems();
    form.reset();
    renderItems();
});

searchInput.addEventListener("input", renderItems);

document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        renderItems();
    });
});

renderItems();
