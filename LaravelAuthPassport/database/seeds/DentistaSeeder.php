<?php

use Illuminate\Database\Seeder;

class DentistaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Dentista::class, 1)->create();
    }
}
