function showMethod(methodId, activeCard) {
    const selectedContent = document.getElementById(methodId);
    if (!selectedContent) {
        return;
    }

    document.querySelectorAll('.method-content').forEach(content => {
        content.classList.remove('active');
    });

    document.querySelectorAll('.method-card').forEach(card => {
        card.classList.remove('active');
    });

    selectedContent.classList.add('active');

    const selectedCard = activeCard || document.querySelector(`.method-card[data-method="${methodId}"]`);
    if (selectedCard) {
        selectedCard.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.method-card[data-method]').forEach(card => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        card.addEventListener('click', () => {
            showMethod(card.dataset.method, card);
        });

        card.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                showMethod(card.dataset.method, card);
            }
        });
    });
});
