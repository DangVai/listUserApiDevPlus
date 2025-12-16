import { api } from './api.js';
import { validateInput } from './validate.js';

const tableBody = document.getElementById('userTableBody');
const modal = document.getElementById('userModal');
const form = document.getElementById('addUserForm');
const modalTitle = document.querySelector('#userModal h3');
const submitBtn = document.querySelector('#addUserForm button[type="submit"]');

let isEditingId = null;

document.addEventListener('DOMContentLoaded', loadUsers);

async function loadUsers() {
    try {
        tableBody.innerHTML = '<tr><td colspan="7" class="text-center py-4">Đang tải...</td></tr>';
        const users = await api.getAll();
        renderTable(users);
    } catch (error) {
        console.error(error);
        alert('Lỗi tải dữ liệu');
    }
}

function renderTable(users) {
    tableBody.innerHTML = users.map(user => `
        <tr class="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
            <td class="py-4 px-6 text-center text-gray-400 text-sm">#${user.id}</td>
            <td class="py-4 px-6 font-medium text-gray-900">${user.name}</td>
            <td class="py-4 px-6"><span class="bg-gray-200 py-1 px-3 rounded-full text-xs font-bold text-gray-700">@${user.username}</span></td>
            <td class="py-4 px-6 text-sm text-gray-600">${user.email}</td>
            <td class="py-4 px-6 text-sm text-gray-600">${user.phone}</td>
            <td class="py-4 px-6 text-sm">
                <a href="http://${user.website}" target="_blank" class="text-blue-500 hover:underline flex items-center gap-1">
                    ${user.website} <i class="fas fa-external-link-alt text-xs"></i>
                </a>
            </td>
            <td class="py-4 px-6 text-center">
                <div class="flex justify-center space-x-2">
                    <button data-id="${user.id}" class="btn-edit w-8 h-8 rounded-full hover:bg-purple-100 text-purple-500 transition">
                        <i class="fas fa-pen pointer-events-none"></i>
                    </button>
                    <button data-id="${user.id}" class="btn-delete w-8 h-8 rounded-full hover:bg-red-100 text-red-500 transition">
                        <i class="fas fa-trash pointer-events-none"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

tableBody.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-edit')) {
        const id = e.target.dataset.id;
        openModalForEdit(id);
    }
    if (e.target.classList.contains('btn-delete')) {
        const id = e.target.dataset.id;
        handleDelete(id);
    }
});

window.openModal = () => { 
    isEditingId = null;
    form.reset();
    resetValidationUI();
    modalTitle.textContent = 'Thêm User Mới';
    submitBtn.textContent = 'Add User';
    modal.classList.remove('hidden');
};

window.closeModal = () => {
    modal.classList.add('hidden');
};

async function openModalForEdit(id) {
    try {
        const user = await api.getOne(id);
        ['name', 'username', 'email', 'phone', 'website'].forEach(key => {
            document.getElementById(key).value = user[key];
        });

        isEditingId = id;
        modalTitle.textContent = 'Chỉnh sửa User';
        submitBtn.textContent = 'Update User';
        resetValidationUI();
        modal.classList.remove('hidden');
    } catch (error) {
        alert('Không lấy được thông tin user');
    }
}

async function handleDelete(id) {
    if (confirm('Bạn chắc chắn muốn xóa?')) {
        try {
            await api.delete(id);
            alert('Đã xóa thành công!');
            loadUsers();
        } catch (error) {
            alert('Xóa thất bại');
        }
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        website: document.getElementById('website').value,
    };

    const { isValid, errors } = validateInput(formData);
    resetValidationUI();

    if (!isValid) {
        showValidationErrors(errors);
        return;
    }

    try {
        if (isEditingId) {
            await api.update(isEditingId, formData);
            alert('Cập nhật thành công!');
        } else {
            await api.create(formData);
            alert('Thêm mới thành công!');
        }
        window.closeModal();
        loadUsers();
    } catch (error) {
        alert('Có lỗi xảy ra!');
    }
});

function resetValidationUI() {
    document.querySelectorAll('.error-msg').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('input').forEach(el => el.classList.remove('border-red-500'));
}

function showValidationErrors(errors) {
    for (const [key, hasError] of Object.entries(errors)) {
        if (hasError) {
            document.getElementById(`error-${key}`).classList.remove('hidden');
            document.getElementById(key).classList.add('border-red-500');
        }
    }
}