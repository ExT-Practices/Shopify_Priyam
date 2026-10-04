function checkPassword(e) {
    var passwordInput = document.getElementById('storePassword');
    var errorMsg = document.getElementById('errorMsg');
    
    if (passwordInput.value === '1') {
        
    } else {
        e.preventDefault();
        errorMsg.style.display = 'flex';
    }
}

function hideError() {
    document.getElementById('errorMsg').style.display = 'none';
}