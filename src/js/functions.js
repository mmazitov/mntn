gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
	initSectionNav();
	initAnimate();
	initYear();
});

const initSectionNav = () => {
	"use strict";
	const sections = document.querySelectorAll(".section");
	const sectionNav = document.querySelector(".navigation__sections--list");

	if (!sectionNav || !sections.length) return;

	sections.forEach((section, index) => {
		section.dataset.section = index;

		const navItem = createNavItem(index);
		sectionNav.appendChild(navItem);

		navItem.addEventListener("click", () => scrollToSection(sections[index]));
	});

	setActiveNavItem(sectionNav, 0);
	window.addEventListener("scroll", () => updateActiveNav(sections, sectionNav));
};

const createNavItem = (index) => {
	const navItem = document.createElement("li");
	navItem.className = "navigation__sections--item";
	navItem.dataset.sectionNav = index;

	const navLink = document.createElement("span");
	navLink.className = "navigation__sections--text";
	navLink.textContent = index === 0 ? "Start" : String(index).padStart(2, "0");

	navItem.appendChild(navLink);
	return navItem;
};

const scrollToSection = (section) => {
	section.scrollIntoView({ behavior: "smooth" });
};

const setActiveNavItem = (sectionNav, activeIndex) => {
	sectionNav.querySelectorAll(".navigation__sections--item").forEach((item, index) => {
		item.classList.toggle("active", index === activeIndex);
	});
};

const updateActiveNav = (sections, sectionNav) => {
	const viewportCenter = window.innerHeight / 2;

	sections.forEach((section, index) => {
		const rect = section.getBoundingClientRect();
		const isActive = rect.top <= viewportCenter && rect.bottom >= viewportCenter;

		if (isActive) setActiveNavItem(sectionNav, index);
	});
};

const initAnimate = () => {
	if (ScrollTrigger.isTouch !== 1) {
		animateItems(
			".hiking__section--image-right .hiking__content, .hiking__section--image-left .hiking__image--wrapper",
			{ opacity: 0, x: -100 },
			{ opacity: 1, x: 0 }
		);
		animateItems(
			".hiking__section--image-right .hiking__image--wrapper, .hiking__section--image-left .hiking__content",
			{ opacity: 0, x: 100 },
			{ opacity: 1, x: 0 }
		);
	}

	animateHeroElements();

	animateControls();
};

const animateItems = (selector, fromVars, toVars) => {
	const items = gsap.utils.toArray(selector);
	items.forEach((item) => {
		gsap.fromTo(item, fromVars, {
			...toVars,
			scrollTrigger: {
				trigger: item,
				start: "-450",
				end: "-100",
				scrub: true,
			},
		});
	});
};

const animateHeroElements = () => {
	const heroSubtitle = document.querySelector(".hero__subtitle");
	const heroTitle = document.querySelector(".hero__title");
	const heroLink = document.querySelector(".hero__link");

	gsap.from(heroSubtitle, {
		opacity: 0,
		y: 50,
		duration: 1.5,
		delay: 0.5,
		ease: "power3.out",
	});

	gsap.from(heroTitle, {
		opacity: 0,
		y: 50,
		duration: 1.5,
		delay: 1,
		ease: "power3.out",
	});

	gsap.from(heroLink, {
		opacity: 0,
		y: 50,
		duration: 1.5,
		delay: 1.5,
		ease: "power3.out",
	});
};

const animateControls = () => {
	const elements = document.querySelectorAll(".social__list, .navigation.navigation__sections");

	elements.forEach((element) => {
		gsap.from(element, {
			opacity: 0,
			y: -100,
			duration: 1.5,
			delay: 2,
			ease: "power3.out",
		});
	});
};

const initYear = () => {
	const year = new Date().getFullYear(); // Get the current year
	const yearDate = document.querySelector(".copyright__year"); // Select the span element for the year
	if (yearDate) {
		// Check if the `.cur-year` element exists
		yearDate.textContent = year; // Set the text content to the current year
	}
};
