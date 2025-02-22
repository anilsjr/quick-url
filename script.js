// Get references to the input fields, button, and container
let nameInput = document.getElementById('name');
let linkInput = document.getElementById('link');
let addButton = document.getElementById('add-link');
let linksContainer = document.getElementById('links-container');

// Retrieve links from localStorage or initialize as an empty array
let links = JSON.parse(localStorage.getItem("links")) || [];

// Ensure links is an array
if (!Array.isArray(links)) {
    links = [];
}

// Function to add a new link
function addLink(event) {
    event.preventDefault(); // Prevent form submission reload

    let name = nameInput.value.trim();
    let link = linkInput.value.trim();

    // Validate input fields
    if (!name || !link) {
        alert("Please enter a name and a link");
        return;
    }

    // Create a new link object and add it to the links array
    let newLink = { name, link };
    links.push(newLink);

    // Save the updated links array to localStorage
    localStorage.setItem("links", JSON.stringify(links));

    // Clear input fields
    nameInput.value = '';
    linkInput.value = '';

    // Render the updated list of links
    renderLinks();
}

// Function to delete a link by its index
function deleteLink(index) {
    links.splice(index, 1);
    localStorage.setItem("links", JSON.stringify(links));
    renderLinks();
}

// Function to render the list of links
function renderLinks() {
    linksContainer.innerHTML = '';

    links.forEach((link, index) => {
        let linkBox = document.createElement('div');
        linkBox.classList.add('link-box', 'list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'p-3', 'col-12', 'col-md-5', 'col-lg-3', 'shadow-sm');

        let linkElement = document.createElement('a');
        linkElement.classList.add('text-decoration-none', 'fw-bold', 'text-primary', 'text-truncate');
        linkElement.href = link.link;
        linkElement.innerText = link.name;
        linkElement.target = "_blank"; // Open link in new tab

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-sm', 'btn-danger', 'ms-3');
        deleteButton.innerText = 'Delete';

        // Add event listener to the delete button
        deleteButton.addEventListener('click', () => deleteLink(index));

        // Append elements
        linkBox.appendChild(linkElement);
        linkBox.appendChild(deleteButton);
        linksContainer.appendChild(linkBox);
    });
}

// Add event listener to the add button
addButton.addEventListener('click', addLink);

// Initial render of the links
renderLinks();
