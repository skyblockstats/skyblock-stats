let tooltipEl: HTMLDivElement
let tooltipLocked = false

export function setTooltipEl(el: HTMLDivElement) {
	tooltipEl = el
}

export function onMouseMove(e: MouseEvent) {
	if (!tooltipLocked && tooltipEl.style.display !== 'none') {
		moveTooltipToMouse(e)
	}
}

function moveTooltipToMouse(e: MouseEvent) {
	const mouseX = e.pageX
	const mouseY = e.pageY
	// if it's going to be off the bottom of the screen, move it up
	if (mouseY + tooltipEl.offsetHeight > window.innerHeight + window.scrollY - 10) {
		// put it at the bottom of the screen
		tooltipEl.style.top = `${window.innerHeight + window.scrollY - 10 - tooltipEl.offsetHeight}px`
	} else {
		// otherwise, put it at the mouse's y position
		tooltipEl.style.top = mouseY + 'px'
	}
	// if it's going to be off the right of the screen, move it left
	if (mouseX + tooltipEl.offsetWidth > window.innerWidth + window.scrollX - 10) {
		// put it at the right of the screen
		tooltipEl.style.left = `${window.innerWidth + window.scrollX - 10 - tooltipEl.offsetWidth}px`
	} else {
		// otherwise, put it at the mouse's x position
		tooltipEl.style.left = mouseX + 15 + 'px'
	}
}

export function registerItem(itemEl: HTMLElement) {
	itemEl.addEventListener('mouseover', e => {
		if (!tooltipLocked) {
			moveTooltipToMouse(e)
			// copy the lore and name from the tooltip-lore and
			// tooltip-name elements inside the item el
			const loreHtml = itemEl.getElementsByClassName('tooltip-lore')[0].innerHTML
			const nameHtml = itemEl.getElementsByClassName('tooltip-name')[0].innerHTML
			tooltipEl.innerHTML = `<p class="item-lore-name">${nameHtml}</p><p class="item-lore-text">${loreHtml}</p>`
		}
		tooltipEl.style.display = 'block'
	})
	itemEl.addEventListener('mouseout', () => {
		if (!tooltipLocked) {
			tooltipEl.innerHTML = ''
			tooltipEl.style.display = 'none'
		}
	})
	itemEl.addEventListener('click', e => {
		tooltipLocked = !tooltipLocked
		moveTooltipToMouse(e)
		tooltipEl.style.display = 'block'
		if (tooltipLocked) {
			tooltipEl.style.userSelect = 'auto'
			tooltipEl.style.pointerEvents = 'auto'
		} else {
			tooltipEl.style.userSelect = ''
			tooltipEl.style.pointerEvents = ''
		}
		const loreHtml = itemEl.getElementsByClassName('tooltip-lore')[0].innerHTML
		const nameHtml = itemEl.getElementsByClassName('tooltip-name')[0].innerHTML
		tooltipEl.innerHTML = `<p class="item-lore-name">${nameHtml}</p><p class="item-lore-text">${loreHtml}</p>`
	})
	document.addEventListener('mousedown', e => {
		if (tooltipLocked && !tooltipEl.contains(e.target as Node)) {
			tooltipLocked = false
			tooltipEl.style.userSelect = ''
			tooltipEl.style.pointerEvents = ''
			tooltipEl.style.display = 'none'
		}
	})
}
