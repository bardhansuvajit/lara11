<?php

namespace App\Http\Controllers\Admin\Country;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\View\View;

use App\Interfaces\CountryInterface;

class CountryController extends Controller
{
    private CountryInterface $countryRepository;

    public function __construct(CountryInterface $countryRepository)
    {
        $this->countryRepository = $countryRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): View
    {
        $perPage = 15;
        $keyword = $request->input('keyword') ?? '';
        $sortBy = $request->input('sortBy') ?? 'id';
        $sortOrder = $request->input('sortOrder') ?? 'asc';
        $filters = [
            'continent' => $request->input('continent') ?? '',
            'status' => $request->input('status') ?? '',
        ];
        $resp = $this->countryRepository->read($keyword, $filters, $perPage, $sortBy, $sortOrder);
        $continentList = $this->countryRepository->continentList();

        return view('admin.country.index', [
            'data' => $resp['data'],
            'continents' => $continentList['data'],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
