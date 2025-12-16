import { validateInput } from './validate.js';
import { renderRow, closeModal, getUsers } from './main.js';
const API_URL = 'https://jsonplaceholder.typicode.com';
const form = document.getElementById('addUserForm');
let editingUserId = null;
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const userData = {
        name: document.getElementById('name').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        website: document.getElementById('website').value,
    };

    if (!validateInput(userData)) {
        return;
    }

    try {
        let response;
        if (editingUserId) {
            // Update existing user
            response = await fetch(`${API_URL}/users/${editingUserId}`, {
                method: 'PUT',
                body: JSON.stringify(userData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            alert('Cập nhật User thành công!');
        } else {
            // Add new user
            response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const data = await response.json();
            renderRow(data);
            alert('Thêm User thành công!');
        }

        closeModal();
        if (editingUserId) {
            getUsers();
        }

    } catch (error) {
        console.error('Lỗi khi lưu user:', error);
        alert('Có lỗi xảy ra khi lưu user.');
    }
});

