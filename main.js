const API_URL = 'https://jsonplaceholder.typicode.com';
const tableBody = document.getElementById('userTableBody');
const modal = document.getElementById('userModal');
const form = document.getElementById('addUserForm');
// import { renderRow } from './renderRow.js';

async function getUsers() {
    try {
        const response = await fetch(`${API_URL}/users`);
        const users = await response.json();

        tableBody.innerHTML = '';

        users.forEach(user => {
            renderRow(user);
        });
    } catch (error) {
        alert('Không thể tải danh sách user!');
    }
}

function renderRow(user) {
    const tr = document.createElement('tr');
    tr.className = "border-b border-gray-200 hover:bg-gray-100";
    tr.className = "border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out";
    tr.innerHTML = `
    <td class="py-4 px-6 text-center whitespace-nowrap text-gray-400 text-sm">#${user.id}</td>
    <td class="py-4 px-6 text-left">
        <span class="font-medium text-gray-900">${user.name}</span>
    </td>
    <td class="py-4 px-6 text-left text-sm text-gray-600">
        <span class="bg-gray-200 py-1 px-3 rounded-full text-xs text-gray-700 font-bold">@${user.username}</span>
    </td>
    <td class="py-4 px-6 text-left text-sm text-gray-600">${user.email}</td>
    <td class="py-4 px-6 text-left text-sm text-gray-600">${user.phone}</td>
    <td class="py-4 px-6 text-left text-sm">
        <a href="http://${user.website}" target="_blank" class="text-blue-500 hover:text-blue-700 hover:underline flex items-center gap-1">
            ${user.website} <i class="fas fa-external-link-alt text-xs"></i>
        </a>
    </td>
    <td class="py-4 px-6 text-center">
        <div class="flex item-center justify-center space-x-2">
            <button onclick="editUser(${user.id})" class="group w-8 h-8 rounded-full hover:bg-purple-100 flex items-center justify-center transition duration-200" title="Sửa">
                <i class="fas fa-pen text-purple-500 group-hover:scale-110 transition-transform"></i>
            </button>
            <button onclick="deleteUser(${user.id})" class="group w-8 h-8 rounded-full hover:bg-red-100 flex items-center justify-center transition duration-200" title="Xóa">
                <i class="fas fa-trash text-red-500 group-hover:scale-110 transition-transform"></i>
            </button>
        </div>
    </td>
`;
    tableBody.appendChild(tr);
}

getUsers();

function openModal() {
    modal.classList.remove('hidden');
    form.reset();
    resetErrors();
    editingUserId = null;
    document.querySelector('#userModal h3').textContent = 'Thêm User Mới';
    document.querySelector('#addUserForm button[type="submit"]').textContent = 'Add User';
}

function closeModal() {
    modal.classList.add('hidden');
}

window.openModal = openModal;
window.closeModal = closeModal;
window.editUser = editUser;
window.deleteUser = deleteUser;

async function editUser(id) {
    try {
        const response = await fetch(`${API_URL}/users/${id}`);
        const user = await response.json();

        document.getElementById('name').value = user.name;
        document.getElementById('username').value = user.username;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value = user.phone;
        document.getElementById('website').value = user.website;

        editingUserId = id;
        document.querySelector('#userModal h3').textContent = 'Chỉnh sửa User';
        document.querySelector('#addUserForm button[type="submit"]').textContent = 'Update User';

        modal.classList.remove('hidden');
        resetErrors();
    } catch (error) {
        alert('Không thể tải thông tin user để chỉnh sửa.');
    }
}

async function deleteUser(id) {
    if (confirm('Bạn có chắc chắn muốn xóa user này?')) {
        try {
            await fetch(`${API_URL}/users/${id}`, {
                method: 'DELETE',
            });

            alert('Xóa user thành công!');
            getUsers();
        } catch (error) {
            console.error('Lỗi khi xóa user:', error);
            alert('Có lỗi xảy ra khi xóa user.');
        }
    }
}

function resetErrors() {
    ['name', 'username', 'email', 'phone', 'website'].forEach(id => {
        const errorMsg = document.getElementById(`error-${id}`);
        errorMsg.classList.add('hidden');
        document.getElementById(id).classList.remove('border-red-500');
    });
}

// Export functions for use in other modules
export { renderRow, closeModal, getUsers };
