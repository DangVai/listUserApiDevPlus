export function validateInput(data) {
    const errors = {};
    let isValid = true;

    if (!data.name.trim()) errors.name = true;
    if (!data.username.trim()) errors.username = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) errors.email = true;

    const phoneRegex = /^\d{10,11}$/;
    if (!data.phone.trim()) errors.phone = true;

    if (!data.website.trim()) errors.website = true;

    isValid = Object.keys(errors).length === 0;

    return { isValid, errors };
}