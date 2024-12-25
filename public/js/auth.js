import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Verificar se o usuário está logado
onAuthStateChanged(auth, (user) => {
    const currentPath = window.location.pathname;
    const isLoginPage = currentPath.includes('login.html');

    if (user) {
        // Usuário está logado
        if (isLoginPage) {
            // Se estiver na página de login, redireciona para o dashboard
            window.location.href = 'index.html';
        }
    } else {
        // Usuário não está logado
        if (!isLoginPage) {
            // Se não estiver na página de login, redireciona para o login
            window.location.href = 'login.html';
        }
    }
});

// Função para fazer login
window.handleLogin = async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // O redirecionamento será feito pelo onAuthStateChanged
    } catch (error) {
        console.error('Erro no login:', error);
        errorMessage.style.display = 'block';
        
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage.textContent = 'E-mail inválido.';
                break;
            case 'auth/user-disabled':
                errorMessage.textContent = 'Usuário desativado.';
                break;
            case 'auth/user-not-found':
                errorMessage.textContent = 'Usuário não encontrado.';
                break;
            case 'auth/wrong-password':
                errorMessage.textContent = 'Senha incorreta.';
                break;
            default:
                errorMessage.textContent = 'Erro ao fazer login. Tente novamente.';
        }
    }
};

// Função para recuperar senha
window.forgotPassword = async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const errorMessage = document.getElementById('errorMessage');

    if (!email) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Digite seu e-mail para recuperar a senha.';
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);
        alert('E-mail de recuperação de senha enviado. Verifique sua caixa de entrada.');
    } catch (error) {
        console.error('Erro ao enviar e-mail de recuperação:', error);
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Erro ao enviar e-mail de recuperação. Verifique se o e-mail está correto.';
    }
};

// Função para fazer logout
window.handleLogout = async () => {
    try {
        await signOut(auth);
        // O redirecionamento será feito pelo onAuthStateChanged
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        alert('Erro ao fazer logout. Tente novamente.');
    }
}; 