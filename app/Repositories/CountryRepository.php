<?php

namespace App\Repositories;

use App\Interfaces\CountryInterface;
use Illuminate\Support\facades\DB;

use App\Models\Country;

class CountryRepository implements CountryInterface {
    public function read(string $keyword, array $filters = [], int $perPage = 15, string $sortBy = 'id', string $sortOrder = 'asc') : array {
        DB::enableQueryLog();
        $query = Country::query();

        $query->when($keyword, function($query) use ($keyword) {
            $query->where('short_name', 'like', '%'.$keyword.'%')
            ->orWhere('name', 'like', '%'.$keyword.'%')
            ->orWhere('phone_code', 'like', '%'.$keyword.'%')
            ->orWhere('phone_no_digits', 'like', '%'.$keyword.'%')
            ->orWhere('zip_code_format', 'like', '%'.$keyword.'%')
            ->orWhere('currency_code', 'like', '%'.$keyword.'%')
            ->orWhere('continent', 'like', '%'.$keyword.'%')
            ->orWhere('language', 'like', '%'.$keyword.'%')
            ->orWhere('time_zone', 'like', '%'.$keyword.'%');
        });

        // dd($filters);

        if (!empty($filters)) {
            foreach ($filters as $field => $value) {
                if (!is_null($value) && $value !== '') {
                    if (is_array($value)) {
                        // For multiple values
                        $query->whereIn($field, $value);
                    } else {
                        // Basic where clause
                        $query->where($field, '=', $value);
                    }
                }
            }
        }

        if ($perPage !== 'all') {
            $data = $query
            ->orderBy($sortBy, $sortOrder)
            ->paginate($perPage)
            ->withQueryString();
        } else {
            $data = $query
            ->orderBy($sortBy, $sortOrder)
            ->get()
            ->withQueryString();
        }

        // dd(DB::getQueryLog());

        $response = [
            'code' => 200,
            'status' => 'success',
            'message' => 'Data found',
            'data' => $data
        ];
        return $response;
    }

    public function continentList() : array {
        $data = Country::select('continent')->groupBy('continent')->orderBy('continent')->get();

        $response = [
            'code' => 200,
            'status' => 'success',
            'message' => 'Data found',
            'data' => $data
        ];
        return $response;
    }
}