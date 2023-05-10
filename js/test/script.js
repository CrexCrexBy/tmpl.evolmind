// * класс-помощник
class Helper
{
	config = {
		// * задержка между итерациями события
		throttleWait: 10
	}

	// * задержка между итерациями события
	throttle(callback, wait = this.config.throttleWait) {
		let time = Date.now();
		return () => {
			if ((time + wait - Date.now()) < 0)
			{
				callback();
				time = Date.now();
			}
		}
	}
}

// * прилипание слоя
class Sticky
{
	config = {
		baseClass: 'sticky',
		parentClass: 'sticky__parent',
		targetClass: 'sticky__target',
		targetActiveClass: 'sticky__target--active',
		placeholderClass: 'sticky__placeholder',

		offset: 0,
		top: 0,
		end: false,
	}

	constructor(target)
	{
		this.target = target
		this.target.height = this.target.clientHeight

		this.prepareParent()
		this.prepareTarget()
		this.placeholder = this.preparePlaceholder()

		this.event = this.addEvent()

		this.config = { ...this.config, ...this.getConfig()}
	}

	prepareParent()
	{
		this.target.parentNode.classList.add(this.config.baseClass, this.config.parentClass)
	}

	prepareTarget()
	{
		this.target.classList.add(this.config.targetClass)
	}

	preparePlaceholder()
	{
		const placeholder = document.createElement('div')
		placeholder.classList.add(this.config.placeholderClass)
		this.target.parentNode.insertBefore(placeholder, this.target.nextSibling)

		placeholder.hidden = true

		placeholder.style.height = this.target.clientHeight+'px'

		return placeholder
	}

	getConfig()
	{
		const config = {}
		const targetConfig = this.target.dataset.sticky.split(';');
		if (targetConfig.length !== 0)
		{
			targetConfig.forEach((e) => {
				const params = e.split(':');
				const param = params[0] || '';
				const value = params[1] || '';
				if (param && value) config[param.trim()] = value.trim();
			})
		}
		return config;
	}

	addEvent()
	{
		const helper = new Helper();

		window.addEventListener('resize', helper.throttle(() => {
			if (window.scrollY > this.config.offset)
			{
				console.log(this.target.clientWidth);
				this.target.style.width = this.placeholder.clientWidth+'px'
			}
		}));

		window.addEventListener('scroll', helper.throttle(() => {
			this.target.classList.toggle(this.config.targetActiveClass, window.scrollY > this.config.offset)

			this.placeholder.hidden = !(window.scrollY > this.config.offset)

			const end = document?.querySelector(this.config.end).getBoundingClientRect();
			if (end) {
				if (end.bottom > 0) {
					this.target.setAttribute('style', `position: absolute; top: ${window.scrollY+end.bottom}px width: ${this.target.clientWidth}px; height: ${this.target.clientHeight}px;`)
				}
			}

			if (window.scrollY > this.config.offset)
			{
				this.target.setAttribute('style', `position: fixed; width: ${this.target.clientWidth}px; height: ${this.target.clientHeight}px;`)
			}
			else
			{
				this.target.removeAttribute('style')
			}
		}));

	}
}

document.querySelectorAll('[data-sticky]').forEach(e => new Sticky(e));
