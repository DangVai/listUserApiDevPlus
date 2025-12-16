// function renderRow(user) {

//     const tr = document.createElement('tr');
//     tr.className = "border-b border-gray-200 hover:bg-gray-100";

//     tr.className = "border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out";

//     tr.innerHTML = `
//     <td class="py-4 px-6 text-center whitespace-nowrap text-gray-400 text-sm">#${user.id}</td>
    
//     <td class="py-4 px-6 text-left">
//         <span class="font-medium text-gray-900">${user.name}</span>
//     </td>
    
//     <td class="py-4 px-6 text-left text-sm text-gray-600">
//         <span class="bg-gray-200 py-1 px-3 rounded-full text-xs text-gray-700 font-bold">@${user.username}</span>
//     </td>
    
//     <td class="py-4 px-6 text-left text-sm text-gray-600">${user.email}</td>
    
//     <td class="py-4 px-6 text-left text-sm text-gray-600">${user.phone}</td>
    
//     <td class="py-4 px-6 text-left text-sm">
//         <a href="http://${user.website}" target="_blank" class="text-blue-500 hover:text-blue-700 hover:underline flex items-center gap-1">
//             ${user.website} <i class="fas fa-external-link-alt text-xs"></i>
//         </a>
//     </td>
    
//     <td class="py-4 px-6 text-center">
//         <div class="flex item-center justify-center space-x-2">
//             <button onclick="editUser(${user.id})" class="group w-8 h-8 rounded-full hover:bg-purple-100 flex items-center justify-center transition duration-200" title="Sửa">
//                 <i class="fas fa-pen text-purple-500 group-hover:scale-110 transition-transform"></i>
//             </button>
            
//             <button onclick="deleteUser(${user.id})" class="group w-8 h-8 rounded-full hover:bg-red-100 flex items-center justify-center transition duration-200" title="Xóa">
//                 <i class="fas fa-trash text-red-500 group-hover:scale-110 transition-transform"></i>
//             </button>
//         </div>
//     </td>
// `;

//     tableBody.appendChild(tr);
// }

// export { renderRow };