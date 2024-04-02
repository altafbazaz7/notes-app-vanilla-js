let addBtn = document.querySelector(".add-button");
let inputFld = document.querySelector(".input-field");
let noteContainer = document.querySelector(".wrapper");

let notes = [];

addBtn.addEventListener('click', function () {
    notes.push({ title: "", id: notes.length + 1, isEdit: false });
    showNotes();
});

function showNotes() {
    noteContainer.innerHTML = "";

    for (let i = 0; i < notes.length; i++) {
        const readOnlyAttribute = notes[i]?.isEdit ? 'readonly' : '';

        noteContainer.innerHTML += `
            <div class="item">
                <input class="input-field"
                    onchange="handleInputChange(event, ${notes[i].id})"
                    placeholder="Note-${notes[i].id}" 
                    value="${notes[i].title}"
                    ${readOnlyAttribute}
                    />
                <button class="save"
                
                onclick="handeAction('${!(notes[i].isEdit) ? "Save" : "Edit"}', ${notes[i].id})"

                >${!(notes[i].isEdit) ? "Save" : "Edit"}</button>
                <button class="delete"   
                onclick="handleDelete(${notes[i].id})"
                >Delete</button>
            </div>`;
    }
}

function handleInputChange(e, id) {
    let tempObj = {
        title: e.target.value,
        id: id
    };
    let findElem = notes.map((el, idx) => {
        if (el.id === id) {
            return tempObj
        }
        return el
    })

    notes = findElem
}

function handeAction(actionType, id) {
    if (actionType == 'Save') {
        let findElem = notes.map((el, idx) => {
            if (el.id === id) {
                return { ...el, isEdit: true }
            }
            return el
        })

        notes = findElem
    } else {
        let findElem = notes.map((el, idx) => {
            if (el.id === id) {
                return { ...el, isEdit: false }
            }
            return el
        })

        notes = findElem
    }
    showNotes()

}



function handleDelete(id) {
    let filteredNotes = notes.filter((el, idx) => el.id !== id)
    notes = filteredNotes
    showNotes()
}