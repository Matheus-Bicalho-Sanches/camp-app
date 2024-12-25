import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { collection, addDoc, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Função para formatar data
function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// Função para carregar usuários
async function loadUsers() {
    try {
        const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(usersQuery);
        const tableBody = document.querySelector('.users-table tbody');
        tableBody.innerHTML = ''; // Limpa a tabela

        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const row = document.createElement('tr');
            
            // Cria a linha da tabela com os dados do usuário
            row.innerHTML = `
                <td>${userData.fullName}</td>
                <td>${userData.email}</td>
                <td><span class="status-badge status-${userData.accessType.toLowerCase()}">${userData.accessType}</span></td>
                <td>Ativo</td>
                <td>${formatDate(userData.createdAt)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" title="Editar" onclick="editUser('${doc.id}')">
                            <i class="ri-edit-line"></i>
                        </button>
                        <button class="btn-action" title="Excluir" onclick="deleteUser('${doc.id}')">
                            <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        alert('Erro ao carregar usuários: ' + error.message);
    }
}

// Função para formatar o número de WhatsApp
function formatWhatsApp(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    }
    input.value = value;
}

// Função para abrir o modal
function openModal() {
    document.getElementById('modalOverlay').style.display = 'block';
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('createUserForm').reset();
}

// Função para criar usuário
async function handleCreateUser(event) {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const fullName = form.fullName.value;
    const accessType = form.accessType.value;
    const whatsapp = form.whatsapp.value;

    try {
        // Criar usuário no Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Adicionar informações adicionais no Firestore
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            fullName,
            email,
            accessType,
            whatsapp,
            createdAt: new Date().toISOString()
        });

        alert('Usuário criado com sucesso!');
        closeModal();
        loadUsers(); // Recarrega a lista de usuários
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        alert('Erro ao criar usuário: ' + error.message);
    }
}

// Função para filtrar usuários
function filterUsers(searchTerm) {
    const rows = document.querySelectorAll('.users-table tbody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const match = text.includes(searchTerm.toLowerCase());
        row.style.display = match ? '' : 'none';
    });
}

// Exportar funções para uso global
window.formatWhatsApp = formatWhatsApp;
window.openModal = openModal;
window.closeModal = closeModal;
window.handleCreateUser = handleCreateUser;
window.editUser = (userId) => {
    console.log('Editar usuário:', userId);
    // Implementar edição posteriormente
};
window.deleteUser = (userId) => {
    console.log('Excluir usuário:', userId);
    // Implementar exclusão posteriormente
};

// Adicionar listeners quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Carregar usuários inicialmente
    loadUsers();

    // Adicionar listener para o botão de criar usuário
    document.querySelector('.btn-criar').addEventListener('click', openModal);

    // Adicionar listener para formatar WhatsApp
    document.getElementById('whatsapp').addEventListener('input', function() {
        formatWhatsApp(this);
    });

    // Adicionar listener para o campo de busca
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', (e) => filterUsers(e.target.value));
}); 