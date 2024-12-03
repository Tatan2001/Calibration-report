document.querySelector('.btn').addEventListener('click', () => {
    const btn = document.querySelector('.btn');
    btn.textContent = 'Loading...';
    btn.style.background = 'linear-gradient(90deg, #ffa500, #ff4500)';
    setTimeout(() => {
        window.location.href = 'main.html'; // Redirect after animation
    }, 1000);
});
