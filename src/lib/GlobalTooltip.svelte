<script lang="ts">
	import { onMount } from 'svelte'

	let tooltipEl

	// this script handles the item hover lore tooltip
	onMount(() => {
		// TODO: have something that automatically registers the event listener when we create a new MinecraftTooltip
		const itemEls = document.getElementsByClassName('minecraft-tooltip')
		let tooltipLocked = false
		function moveTooltipToMouse(e) {
			const mouseX = e.pageX
			const mouseY = e.pageY
			console.log(mouseY + tooltipEl.offsetHeight, window.innerHeight + window.scrollY - 10)
			// if it's going to be off the bottom of the screen, move it up
			if (mouseY + tooltipEl.offsetHeight > window.innerHeight + window.scrollY - 10) {
				// put it at the bottom of the screen
				tooltipEl.style.top = `${
					window.innerHeight + window.scrollY - 10 - tooltipEl.offsetHeight
				}px`
			} else {
				// otherwise, put it at the mouse's y position
				tooltipEl.style.top = mouseY + 'px'
			}
			// if it's going to be off the right of the screen, move it left
			if (mouseX + tooltipEl.offsetWidth > window.innerWidth + window.scrollX - 10) {
				// put it at the right of the screen
				tooltipEl.style.left = `${
					window.innerWidth + window.scrollX - 10 - tooltipEl.offsetWidth
				}px`
			} else {
				// otherwise, put it at the mouse's x position
				tooltipEl.style.left = mouseX + 'px'
			}
		}
		document.addEventListener('mousemove', e => {
			if (!tooltipLocked && tooltipEl.style.display !== 'none') {
				moveTooltipToMouse(e)
			}
		})

		for (const itemEl of itemEls as unknown as HTMLElement[]) {
			// if (!(itemEl instanceof HTMLElement)) continue

			// if the item doesn't have lore or a name, that must mean it's air
			// if (!itemEl.dataset.loreHtml && !itemEl.dataset.nameHtml) continue

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
					tooltipEl.style.userSelect = null
					tooltipEl.style.pointerEvents = null
				}
				const loreHtml = itemEl.getElementsByClassName('tooltip-lore')[0].innerHTML
				const nameHtml = itemEl.getElementsByClassName('tooltip-name')[0].innerHTML
				tooltipEl.innerHTML = `<p class="item-lore-name">${nameHtml}</p><p class="item-lore-text">${loreHtml}</p>`
			})
			document.addEventListener('mousedown', e => {
				if (tooltipLocked && !tooltipEl.contains(e.target)) {
					tooltipLocked = false
					tooltipEl.style.userSelect = null
					tooltipEl.style.pointerEvents = null
					tooltipEl.style.display = 'none'
				}
			})
		}
	})
</script>

<div id="global-tooltip" style="display: none" bind:this={tooltipEl} />

<style>
	#global-tooltip {
		position: absolute;
		user-select: none;
		pointer-events: none;
		overflow: hidden;
		z-index: 100;
		background-color: #0a0a0aee;
		padding: 0 0.25rem;
		border-radius: 3px;
		box-shadow: 0 0 0 3px #206, 0 0 0 6px #000;
		font-family: Minecraft;
		white-space: nowrap;
	}
	#global-tooltip :global(p) {
		margin: 0;
	}
	#global-tooltip :global(.item-lore-name) {
		margin-bottom: 0.5em;
	}
</style>
