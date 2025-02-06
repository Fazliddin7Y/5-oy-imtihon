function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (email && password) {
        document.getElementById("auth-section").classList.add("hidden");
        document.getElementById("main-section").classList.remove("hidden");
    }
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    if (name && email && password) {
        alert("ruyxatdan muvaffaqiyatli utdinggiz.");
        showLogin();
    }
}

function showRegister() {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("register").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("register").classList.add("hidden");
    document.getElementById("login").classList.remove("hidden");
}

function logout() {
    document.getElementById("main-section").classList.add("hidden");
    document.getElementById("auth-section").classList.remove("hidden");
}

const students = [];
let editingStudentIndex = null;

function renderStudents() {
    const studentList = document.getElementById("student-list");
    const studentTable = document.getElementById("students");

    studentList.innerHTML = "";
    studentTable.innerHTML = "";

    students.forEach((student, index) => {
        const listItem = document.createElement("li");
        listItem.className = "mb-2 cursor-pointer";
        listItem.innerHTML = `<div class='bg-yellow-100 p-2 rounded-lg hover:bg-yellow-200'>${student.name}</div>`;
        listItem.onclick = () => showStudentSidebar(student);
        studentList.appendChild(listItem);

        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td class="px-6 py-3">${student.name}</td>
            <td class="px-6 py-3">${student.email}</td>
            <td class="px-6 py-3">${student.phone}</td>
            <td class="px-6 py-3">${student.enroll}</td>
            <td class="px-6 py-3">${student.date}</td>
            <td class="px-6 py-3">
                <button onclick="editStudent(${index})" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                <button onclick="deleteStudent(${index})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
            </td>`;
        studentTable.appendChild(tableRow);
    });
}

function showAddStudentForm() {
    editingStudentIndex = null;
    document.getElementById("student-form").reset();
    document.getElementById("modal-title").textContent = "Tangi talaba qushish";
    document.getElementById("student-modal").classList.remove("hidden");
}

function handleFormSubmit(event) {
    event.preventDefault();
    const student = {
        name: document.getElementById("student-name").value,
        email: document.getElementById("student-email").value,
        phone: document.getElementById("student-phone").value,
        enroll: document.getElementById("student-enroll").value,
        date: document.getElementById("student-date").value,
    };

    if (editingStudentIndex !== null) {
        students[editingStudentIndex] = student;
    } else {
        students.push(student);
    }

    closeModal();
    renderStudents();
}

function closeModal() {
    document.getElementById("student-modal").classList.add("hidden");
}

function editStudent(index) {
    editingStudentIndex = index;
    const student = students[index];

    document.getElementById("student-name").value = student.name;
    document.getElementById("student-email").value = student.email;
    document.getElementById("student-phone").value = student.phone;
    document.getElementById("student-enroll").value = student.enroll;
    document.getElementById("student-date").value = student.date;

    document.getElementById("modal-title").textContent = "Edit Student";
    document.getElementById("student-modal").classList.remove("hidden");
}

function deleteStudent(index) {
    if (confirm("haqiqatan ham shu talabani uchirib tashlamoqchimisiz?")) {
        students.splice(index, 1);
        renderStudents();
    }
}

function showStudentSidebar(student) {
    alert(`Student Info:\nName: ${student.name}\nEmail: ${student.email}`);
}

document.getElementById("search").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)
    );

    const studentTable = document.getElementById("students");
    studentTable.innerHTML = "";

    filteredStudents.forEach(student => {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td class="px-6 py-3">${student.name}</td>
            <td class="px-6 py-3">${student.email}</td>
            <td class="px-6 py-3">${student.phone}</td>
            <td class="px-6 py-3">${student.enroll}</td>
            <td class="px-6 py-3">${student.date}</td>`;
        studentTable.appendChild(tableRow);
    });
});