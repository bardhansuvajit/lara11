<?php

namespace App\Interfaces;

interface CountryInterface {
    public function read(string $keyword, array $filters = [], int $perPage, string $sortBy, string $sortOrder);
    public function continentList();
};