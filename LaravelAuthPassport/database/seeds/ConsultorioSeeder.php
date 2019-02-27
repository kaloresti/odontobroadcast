<?php

use Illuminate\Database\Seeder;

class ConsultorioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Consultorio::class, 1)->create();
    }
}
