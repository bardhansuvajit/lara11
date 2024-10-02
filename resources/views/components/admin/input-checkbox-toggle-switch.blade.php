@props([
    'value',
    'checked' => false
])

<div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
    <label class="inline-flex items-center w-full cursor-pointer">
        <input type="checkbox" value="" class="sr-only peer" {{ $checked ? 'checked' : '' }} wire:change="toggle">

        <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
    </label>
</div>
