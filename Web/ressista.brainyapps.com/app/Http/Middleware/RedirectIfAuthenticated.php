<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{

    public function handle($request, Closure $next, $guard = null)
    {
      
//        if ($request->session()->get('user_verification') == null ||
//            $request->session()->get('user_isAdmin') != null) {
//            return redirect('/');
//        }
        return $next($request);
    }
}
