<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class UpfilesServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */

     public $maxFileSizeMB = 2; 
     public $maxUserQuotaMB = 100;
     public $maxFileDurationDays = 3;
     public $maxTrashDurationDays = 2;
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
