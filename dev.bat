@echo off
echo ===================================
echo    Iniciando Servidor de Desenvolvimento
echo ===================================
echo.

:: Verificar se o node_modules existe
if not exist "node_modules\" (
    echo Instalando dependencias...
    call npm install
    echo.
)

:: Verificar se houve erro na instalação
if errorlevel 1 (
    echo Erro ao instalar dependencias.
    echo Verifique se o Node.js esta instalado corretamente.
    pause
    exit /b 1
)

:: Iniciar o servidor
echo Iniciando o servidor...
echo Servidor rodando em http://localhost:3000
echo.
echo Pressione Ctrl+C para encerrar o servidor
echo.

node server.js 