<?php

use Illuminate\Database\Seeder;

class DentistaHasConsultorioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\DentistaHasConsultorio::class, 1)->create();
    }
}
