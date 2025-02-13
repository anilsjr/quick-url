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
function addLink(){
    let name = nameInput.value; 
    let link = linkInput.value;

    // Validate input fields
    if ((!name) || (!link)){
        alert("Please enter a name and a link");
        return;
    }

    // Create a new link object and add it to the links array
    let newLink = {name, link};
    links.push(newLink);

    // Save the updated links array to localStorage
    localStorage.setItem("links", JSON.stringify(links));

    // Render the updated list of links
    renderLinks();
}

// Function to delete a link by its index
function deleteLink(index){
    // Remove the link from the links array
    links.splice(index, 1);

    // Save the updated links array to localStorage
    localStorage.setItem("links", JSON.stringify(links));

    // Render the updated list of links
    renderLinks();
}

// Function to render the list of links
function renderLinks(){
    // Clear the container before rendering
    linksContainer.innerHTML = '';

    // Iterate over the links array and create elements for each link
    links.forEach((link, index) => {
        let linkBox = document.createElement('div');
        linkBox.classList.add('link-box', 'list-group-item', 'border', 'border-primary', 'd-flex', 'justify-content-between', 'align-items-center', 'my-2', 'mx-1', 'p-2', 'col-5', 'col-md-4', 'col-lg-2');

        let linkElement = document.createElement('a');
        linkElement.classList.add('link-name', 'text-decoration-none', 'text-dark');

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button', 'btn', 'btn-danger');
        
        deleteButton.innerText = 'Delete';
        
        linkElement.href = link.link;
        linkElement.innerText = link.name;

        // Add event listener to the delete button
        deleteButton.addEventListener('click', () => {
            deleteLink(index);
        });

        // Append the link and delete button to the link box
        linkBox.appendChild(linkElement);
        linkBox.appendChild(deleteButton);

        // Append the link box to the container
        linksContainer.appendChild(linkBox);
    });
}

// Add event listener to the add button
addButton.addEventListener('click', addLink);

// Initial render of the links
renderLinks();