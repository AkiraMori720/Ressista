<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfPanelGuest
{

    public function handle($request, Closure $next, $guard = null)
    {
        if ($request->session()->get('user_verification') == null ||
            $request->session()->get('user_isAdmin') == null ||
            $request->session()->get('user_isAdmin') != 'false')
        {
            return redirect('/');
        }
        return $next($request);
    }
}
