@echo off
setlocal enabledelayedexpansion

:: Clear the screen
cls

echo ===================================
echo    Git Commit and Push Assistant
echo ===================================
echo.

:: Check if there are changes to commit
git status
echo.

:: Ask if user wants to proceed
set /p continue=Deseja continuar com o commit? (S/N): 
if /i "!continue!" neq "S" (
    echo Operacao cancelada.
    exit /b
)

:: Add all changes
echo.
echo Adicionando alteracoes...
git add .
echo.

:: Get commit message
set /p commit_msg=Digite a mensagem do commit: 
if "!commit_msg!"=="" (
    echo Mensagem de commit nao pode ser vazia.
    exit /b
)

:: Commit changes
echo.
echo Realizando commit...
git commit -m "!commit_msg!"
echo.

:: Ask if user wants to push
set /p push=Deseja fazer push para o repositorio remoto? (S/N): 
if /i "!push!"=="S" (
    echo.
    echo Realizando push...
    git push origin master
    echo.
)

echo.
echo Operacao concluida!
echo.

pause 