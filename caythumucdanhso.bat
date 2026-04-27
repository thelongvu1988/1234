@echo off
chcp 65001 >nul
:: ============================================================
:: CẤU HÌNH (Đại ca sửa đường dẫn SOURCE ở đây)
:: ============================================================
set "SOURCE=C:\Duong\Dan\Project\Cu"

:: DEST tự động là thư mục chứa file .bat này
set "DEST=%~dp0"
:: Cắt bỏ dấu \ ở cuối đường dẫn
set "DEST=%DEST:~0,-1%"

:: Danh sách các folder rác cần loại bỏ
set "EXCLUDE_DIRS=node_modules dist .git .vscode .idea coverage test .github"

:: ============================================================
:: BƯỚC 1: COPY TOÀN BỘ (CẢ FILE VÀ FOLDER)
:: ============================================================
echo ----------------------------------------------------------
echo 1. Dang copy file va thu muc...
echo Tu: "%SOURCE%"
echo Den: "%DEST%"
echo Bo qua: %EXCLUDE_DIRS%

:: Em đã bỏ "/XF *" để nó copy cả file
:: /E: Copy cả thư mục con
:: /XD: Bỏ qua thư mục rác
robocopy "%SOURCE%" "%DEST%" /E /XD %EXCLUDE_DIRS% /R:0 /W:0

:: ============================================================
:: BƯỚC 2: TẠO LIST (CẢ FILE VÀ FOLDER, CÓ SỐ DÒNG)
:: ============================================================
echo.
echo ----------------------------------------------------------
echo 2. Dang quet danh sach va loc rac...

:: dir /s /b: Liệt kê tất cả file và folder (đường dẫn đầy đủ)
:: (Em đã bỏ /ad để nó hiện cả file)
:: findstr /v: Lọc bỏ các dòng chứa từ khóa rác
:: findstr /n: Đánh số dòng
dir "%DEST%" /s /b | findstr /v "%EXCLUDE_DIRS%" | findstr /n "^" > "%DEST%\cay_thu_muc.txt"

echo.
echo ----------------------------------------------------------
echo DA XONG! 
echo File bao cao da nam tai: "%DEST%\cay_thu_muc.txt"

:: ============================================================
:: BƯỚC 3: MỞ HÀNG
:: ============================================================
start "" "%DEST%\cay_thu_muc.txt"
:: start "" "%DEST%"

pause >nul