document.addEventListener('DOMContentLoaded', function() {
    // ## sidebar toggle
    const toggleButton = document.getElementById('drawer-toggle');
    const drawer = document.getElementById('drawer-navigation');
    const drawerFooter = document.getElementById('drawer-footer');
    const mainContent = document.querySelector('main');
    const sidebarWidth = '60px';

    // Dynamically create the overlay element
    const overlay = document.createElement('div');
    overlay.id = 'drawer-overlay';
    overlay.className = 'fixed inset-0 z-30 bg-black bg-opacity-50 hidden';

    // Append the overlay to the body
    document.body.appendChild(overlay);

    // Check if there's a saved drawer state in localStorage
    const savedDrawerState = localStorage.getItem('drawerState');

    if (drawer && savedDrawerState) {
        // Apply the saved state
        if (savedDrawerState === sidebarWidth) {
            drawer.style.width = sidebarWidth;
            mainContent.classList.remove('md:ml-64');
            mainContent.classList.add('md:ml-20');

            drawerFooter.classList.remove('flex');
            drawerFooter.classList.add('grid');
            drawerFooter.classList.remove('space-x-4');
            drawerFooter.classList.add('space-y-2');
        } else {
            drawer.style.width = '256px';
            mainContent.classList.remove('md:ml-20');
            mainContent.classList.add('md:ml-64');

            drawerFooter.classList.remove('grid');
            drawerFooter.classList.add('flex');
            drawerFooter.classList.remove('space-y-2');
            drawerFooter.classList.add('space-x-4');
        }
    }

    if (toggleButton && drawer && overlay) {
        // when clicked on the toggle button
        toggleButton.addEventListener('click', function() {
            const screenWidth = window.innerWidth;

            // drawer footer set grid to flex
            drawerFooter.classList.toggle('flex');
            drawerFooter.classList.toggle('grid');
            drawerFooter.classList.toggle('space-y-2');
            drawerFooter.classList.toggle('space-x-4');

            // for tablet & mobile view, do a simple toggle
            if (screenWidth <= 768) {
                drawer.style.width = '256px';
                drawer.classList.toggle('-translate-x-full');
                overlay.classList.toggle('hidden');

                drawerFooter.classList.remove('grid');
                drawerFooter.classList.add('flex');
                drawerFooter.classList.remove('space-y-2');
                drawerFooter.classList.add('space-x-4');
            }
            // for bigger screen size, change drawer width
            else {
                if (drawer.style.width === sidebarWidth) {
                    drawer.style.width = '256px';
                    mainContent.classList.remove('md:ml-20');
                    mainContent.classList.add('md:ml-64');

                    localStorage.setItem('drawerState', '256px');
                } else {
                    drawer.style.width = sidebarWidth;
                    mainContent.classList.remove('md:ml-64');
                    mainContent.classList.add('md:ml-20');

                    localStorage.setItem('drawerState', sidebarWidth);
                }
            }
        });

        overlay.addEventListener('click', function() {
            drawer.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        });
    }



    // ## on form submit change button text
    document.querySelectorAll('form').forEach(function(form) {
        form.addEventListener('submit', function(event) {
            form.querySelectorAll('button').forEach(function(button) {
                button.textContent = 'Loading...';
                button.disabled = true;
            });
        });
    });



    // ## dropdown
    const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');

    dropdownToggles.forEach(toggle => {
        const targetDropdownId = toggle.getAttribute('data-dropdown-toggle');
        const targetDropdownAlign = toggle.getAttribute('data-dropdown-align');
        const dropdownMenu = document.getElementById(targetDropdownId);

        toggle.addEventListener('click', function() {
            if (targetDropdownAlign === "up") {
                dropdownMenu.classList.add('absolute', 'w-max', 'text-start', 'bottom-4', 'left-0');
            } else {
                dropdownMenu.classList.add('absolute', 'w-max', 'text-start', 'top-4', 'right-0');
            }
            dropdownMenu.classList.toggle('hidden');
            dropdownMenu.classList.toggle('block');
        });
    });
    // Close dropdown if clicked outside
    document.addEventListener('click', function (event) {
        dropdownToggles.forEach(toggle => {
            const targetDropdownId = toggle.getAttribute('data-dropdown-toggle');
            const dropdownMenu = document.getElementById(targetDropdownId);
            
            if (!toggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.add('hidden');
                dropdownMenu.classList.remove('block');
            }
        });
    });



    // ## collapse
    const collapseToggles = document.querySelectorAll('[data-collapse-toggle]');

    collapseToggles.forEach(toggle => {
        const targetCollapseId = toggle.getAttribute('data-collapse-toggle');
        const collapseMenu = document.getElementById(targetCollapseId);
        const collapseIcon = toggle.querySelector('.collapse-icon');

        toggle.addEventListener('click', function () {
            collapseMenu.classList.toggle('hidden');
            collapseMenu.classList.toggle('block');

            if (collapseMenu.classList.contains('block') && collapseIcon) {
                // up arrow
                collapseIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 -960 960 960" fill="currentColor"><path d="m480-520.35-184 184L232.35-400 480-647.65 727.65-400 664-336.35l-184-184Z"/></svg>`;
            } else if (collapseIcon) {
                // down arrow
                collapseIcon.innerHTML = `<svg aria-hidden="true" class="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`;
            }
        });
    });



    // ## system theme
    const applicationTheme = document.getElementById('applicationTheme');
    const lightThemeButton = document.getElementById('lightTheme');
    const darkThemeButton = document.getElementById('darkTheme');
    const systemThemeButton = document.getElementById('systemTheme');
    const systemThemeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M40-120v-80h880v80H40Zm120-120q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v440q0 33-23.5 56.5T800-240H160Zm0-80h640v-440H160v440Zm0 0v-440 440Z"/></svg>`;
    const lightThemeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>`;
    const darkThemeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>`;
    const htmlElement = document.documentElement;

    // Function to set the theme
    function setTheme(theme) {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            if (applicationTheme) applicationTheme.innerHTML = darkThemeIcon;
            localStorage.setItem('theme', 'dark');
        } else if (theme === 'light') {
            htmlElement.classList.remove('dark');
            if (applicationTheme) applicationTheme.innerHTML = lightThemeIcon;
            localStorage.setItem('theme', 'light');
        } else {
            const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (applicationTheme) applicationTheme.innerHTML = systemThemeIcon;
            if (prefersDarkScheme) {
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'system');
            } else {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'system');
            }
        }
    }

    if (lightThemeButton && darkThemeButton && systemThemeButton) {
        lightThemeButton.addEventListener('click', () => setTheme('light'));
        darkThemeButton.addEventListener('click', () => setTheme('dark'));
        systemThemeButton.addEventListener('click', () => setTheme('system'));
    }

    window.addEventListener('load', () => {
        const savedTheme = localStorage.getItem('theme') || 'system';
        setTheme(savedTheme);
    });







    // ## notification
    function createNotification(type = 'info', heading, desc = '', buttons = []) {
        let buttonsHtml = '';
        let descHtml = '';

        const iconClassesMap = {
            info: 'text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900',
            warning: 'text-orange-500 bg-orange-100 rounded-lg dark:text-orange-300 dark:bg-orange-900',
            success: 'text-green-500 bg-green-100 rounded-lg dark:text-green-300 dark:bg-green-900',
            error: 'text-red-500 bg-red-100 rounded-lg dark:text-red-300 dark:bg-red-900'
        };

        const iconClasses = iconClassesMap[type] || 'text-gray-500 bg-gray-100 rounded-lg dark:text-gray-300 dark:bg-gray-900';

        if (desc) {
            descHtml = `<div class="mb-2 text-sm font-normal">${desc}</div>`;
        }

        buttons.forEach(button => {
            buttonsHtml += `<div>
                <button class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center ${button.class}" onclick="${button.action}">
                    ${button.text}
                </button>
            </div>`;
        });

        const notificationHtml = document.createElement('div');
        notificationHtml.classList.add('w-full', 'max-w-xs', 'p-4', 'text-gray-500', 'bg-white', 'rounded-lg', 'shadow-lg', 'dark:bg-gray-900', 'dark:text-gray-400');

        notificationHtml.innerHTML = `
            <div class="flex">
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${iconClasses}">
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                    <span class="sr-only">Refresh icon</span>
                </div>
                <div class="mx-3 text-sm font-normal">
                    <span class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">${heading}</span>
                    ${descHtml}
                    ${buttonsHtml}
                </div>
                <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-interactive" aria-label="Close">
                    <span class="sr-only">Close</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>
        `;

        const notificationStack = document.getElementById('notification-stack');
        notificationStack.appendChild(notificationHtml);

        const closeButton = notificationHtml.querySelector('button[aria-label="Close"]');
        closeButton.addEventListener('click', () => {
            notificationHtml.remove();
        });

        setTimeout(() => {
            notificationHtml.remove();
        }, 3000);
    }



    // ## check all checkboxes
    const parentCheckbox = document.getElementById('checkbox-all');
    const otherCheckboxes = document.querySelectorAll('input[type=checkbox][id^=checkbox-table-search-]');

    if (parentCheckbox && otherCheckboxes) {
        parentCheckbox.onchange = function() {
            otherCheckboxes.forEach(checkbox => {
                checkbox.checked = parentCheckbox.checked
            })
        }
    }



    // ## notification trigger
    window.addEventListener('quickNotification', (e) => {
        createNotification('success', e.detail[0].heading, e.detail[0].desc);
    });
});


