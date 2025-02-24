const linksContainer = document.getElementById('links-container');
const inputContainer = document.getElementById('input-container');
const nameInput = document.getElementById('name');
const linkInput = document.getElementById('link');
const addLinkBtn = document.getElementById('add-link-btn');
const cancelLinkBtn = document.getElementById('cancel-link-btn');

let links = JSON.parse(localStorage.getItem('links')) || [];
let editIndex = null; // Track the index of the link being edited

const promptBox = document.createElement('div');
promptBox.classList.add('h1', 'col-1','p-2', 'm-2', 'd-flex', 'justify-content-center', 'align-items-center', 'border', 'rounded');
promptBox.innerHTML = `<i class="fa-solid fa-plus"></i>`;
promptBox.id  = 'prompt-trigger-btn';

linksContainer.appendChild(promptBox);
const promptTriggerBtn = document.getElementById('prompt-trigger-btn');


// Show input form
promptTriggerBtn.addEventListener('click', () => {
  editIndex = null;
  nameInput.value = '';
  linkInput.value = '';
  addLinkBtn.textContent = "Add";
  inputContainer.style.display = "flex";
  console.log('hello')
});

function renderLinks() {
    linksContainer.innerHTML = '';
    links.forEach((linkObj, index) => {
        const linkElement = document.createElement('div');
        linkElement.classList.add('link-card', 'col-5', 'col-md-3', 'p-2', 'm-1', 'd-flex', 'justify-content-between', 'align-items-center', 'border', 'b-2', 'rounded');

        linkElement.innerHTML = `
            <a href="${linkObj.link}" target="_blank" class="text-dark text-truncate">${linkObj.name}</a>
            <div>
                <button onclick="editLink(${index})" class="btn btn-sm btn-warning"><i class="fa-solid fa-pen"></i></button>
                <button onclick="deleteLink(${index})" class="btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        linksContainer.appendChild(linkElement);




    });
    
    linksContainer.appendChild(promptBox);


  }

function addLink(event) {
    event.preventDefault();
    let name = nameInput.value.trim();
    let link = linkInput.value.trim();

    if (!name || !link) {
        alert('Please enter both a name and a link.');
        return;
    }

    if (editIndex !== null) {
        // Update existing link
        links[editIndex] = { name, link };
        editIndex = null;
        addLinkBtn.textContent = "Add"; // Reset button text
    } else {
        // Add new link
        links.push({ name, link });
    }

    localStorage.setItem('links', JSON.stringify(links));
    nameInput.value = '';
    linkInput.value = '';
    inputContainer.style.display = "none";
    renderLinks();
}

// Edit an existing link
function editLink(index) {
    editIndex = index;
    nameInput.value = links[index].name;
    linkInput.value = links[index].link;
    addLinkBtn.textContent = "Update"; // Change button text
    inputContainer.style.display = "flex";
}

// Delete a link
function deleteLink(index) {
    links.splice(index, 1);
    localStorage.setItem('links', JSON.stringify(links));
    renderLinks();
}



// Hide input form
cancelLinkBtn.addEventListener('click', () => {
    inputContainer.style.display = "none";
});

// Attach event
addLinkBtn.addEventListener('click', addLink);

// Initial render
renderLinks();
