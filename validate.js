function showError(fieldId, show) {
    const errorMsg = document.getElementById(`error-${fieldId}`);
    if (show) {
        errorMsg.classList.remove('hidden');
        document.getElementById(fieldId).classList.add('border-red-500');
    } else {
        errorMsg.classList.add('hidden');
        document.getElementById(fieldId).classList.remove('border-red-500');
    }
}

function validateInput(data) {
    let isValid = true;

    if (!data.name.trim()) {
        showError('name', true);
        isValid = false;
    } else {
        showError('name', false);
    }

    if (!data.username.trim()) {
        showError('username', true);
        isValid = false;
    } else {
        showError('username', false);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showError('email', true);
        isValid = false;
    } else {
        showError('email', false);
    }

    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(data.phone)) {
        showError('phone', true);
        isValid = false;
    } else {
        showError('phone', false);
    }

    if (!data.website.trim()) {
        showError('website', true);
        isValid = false;
    } else {
        showError('website', false);
    }

    return isValid;
}

export { validateInput };
