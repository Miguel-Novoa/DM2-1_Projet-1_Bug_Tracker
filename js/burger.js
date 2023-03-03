window.addEventListener('resize', function (e) {
    let burger = document.getElementById('burger');
    let nav = document.querySelector('nav');
    let back = document.getElementById('back');

    if (document.body.clientWidth < 890) {
        burger.style.display = 'block';
        nav.style.display = 'none';

        burger.addEventListener('click', () => {
            burger.style.display = 'none';
            nav.classList.add('mobileNav');
            nav.style.display = 'flex';
            back.style.display = 'block';
        });

        back.addEventListener('click', () => {
            burger.style.display = 'block';
            nav.style.display = 'none';
            back.style.display = 'none';
            nav.classList.remove('mobileNav');
        });
    } else if (document.body.clientWidth > 890) {
        burger.style.display = 'none';
        nav.style.display = 'flex';
        back.style.display = 'none';
    }
});