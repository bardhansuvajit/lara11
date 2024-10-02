<?php

namespace App\Http\Controllers\Admin\Locale;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\App;

class LocaleController extends Controller
{
    public function update(Request $request)
    {
        $locale = $request->input('locale');

        if (in_array($locale, ['en', 'hi'])) {
            Session::put('locale', $locale);
            App::setLocale($locale);
        }

        return redirect()->back();
    }
}
