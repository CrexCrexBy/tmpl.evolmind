// # демо переключение языка
document.querySelectorAll('.demo-lang-switch').forEach(e => {
	const lang = document.documentElement.getAttribute('lang');
	if (e.innerText == lang)
	{
		e.closest('li').classList.add('uk-active');
	}
});

document.addEventListener('click', e => {
	// # демо переключение языка
    if (e.target.classList.contains('demo-lang-switch'))
	{
		e.preventDefault();
		document.documentElement.setAttribute('lang', e.target.innerText.toLowerCase());
		document.querySelector('li.uk-active .demo-lang-switch').closest('li.uk-active').classList.remove('uk-active');
		e.target.closest('li').classList.add('uk-active');
	}
});

// * кнопка открытия мобильного меню
const navbarToggleButton = document.querySelector('.uk-navbar-toggle');
UIkit.util.on('#modal-mobile-menu', 'beforeshow', e => {
	console.log('beforeshow', e.target);
	navbarToggleButton.classList.add('uk-navbar-toggle-active');
	navbarToggleButton.ariaExpanded = true;
});
// ! у модального окна ставится tabindex='-1' что блокирует переход к кнопке закрытия, оставил как есть
// UIkit.util.on('#modal-mobile-menu', 'shown', e => {
// 	e.target.removeAttribute('tabindex');
// });
UIkit.util.on('#modal-mobile-menu', 'beforehide', e => {
	console.log('beforehide', e.target);
	navbarToggleButton.classList.remove('uk-navbar-toggle-active');
	navbarToggleButton.ariaExpanded = false;
});