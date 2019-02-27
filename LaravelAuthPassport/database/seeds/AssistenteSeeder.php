<?php

use Illuminate\Database\Seeder;

class AssistenteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Assistente::class, 1)->create();
    }
}
