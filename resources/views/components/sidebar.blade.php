@props([
    'width' => '48', 
])

@php
$width = match ($width) {
    '24' => 'w-24',
    '48' => 'w-48',
    '72' => 'w-72',
    '96' => 'w-96',
    default => $width,
};
@endphp

<aside class="hidden fixed z-40 top-0 right-0 overflow-y-auto mt-16 {{ $width }} h-full shadow-lg border-l bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" id="view-sidebar">
    <div class="border-b border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center py-1 px-2">
            <div class="flex items-center space-x-2 font-bold text-gray-900 dark:text-white">
                {{ $header }}
            </div>

            <button type="button" data-dropdown-toggle="notification-dropdown" class="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 relative" aria-label="Close">
                <span class="sr-only">Close</span>
                <div class="w-4 h-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </div>
            </button>
        </div>
    </div>
    <div class="pt-2 px-3 pb-20">
        {{ $body }}
    </div>
</aside>